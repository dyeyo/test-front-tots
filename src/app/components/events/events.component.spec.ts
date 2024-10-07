import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { EventsService } from './../../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let eventsService: EventsService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EventsComponent, CommonModule],
      providers: [
        { provide: EventsService, useValue: { getEvents: () => of([]) } },
        { provide: ToastrService, useValue: { error: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    eventsService = TestBed.inject(EventsService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.formFilters).toBeDefined();
    expect(component.formFilters.get('tipo')?.value).toBe('');
    expect(component.formFilters.get('capacidad')?.value).toBe('');
    expect(component.formFilters.get('fecha_inicio')?.value).toBe('');
    expect(component.formFilters.get('fecha_final')?.value).toBe('');
  });

  it('should load events successfully', () => {
    const mockEvents = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ];
    const eventsSpy = spyOn(eventsService, 'getEvents').and.returnValue(of(mockEvents));

    component.loadEvents();

    expect(eventsSpy).toHaveBeenCalledWith(component.formFilters.value);
    expect(component.events.length).toBe(2);
    expect(component.events).toEqual(mockEvents);
  });

  it('should show toastr error message on load events error', () => {
    const toastrSpy = spyOn(toastrService, 'error');
    spyOn(eventsService, 'getEvents').and.returnValue(throwError(() => new Error('Error')));

    component.loadEvents();

    expect(toastrSpy).toHaveBeenCalledWith('Error al cargar los espacios', 'Algo va mal');
  });
});
