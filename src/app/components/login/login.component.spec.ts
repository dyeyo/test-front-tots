import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: { login: () => of({}) } },
        { provide: ToastrService, useValue: { error: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formLogin).toBeDefined();
    expect(component.formLogin.get('email')?.value).toBe('diego@gmail.com');
    expect(component.formLogin.get('password')?.value).toBe('123456789');
  });

  it('should call AuthService login and navigate on successful login', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const loginSpy = spyOn(authService, 'login').and.returnValue(of({}));

    component.submitLogin();

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'diego@gmail.com',
      password: '123456789',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should show toastr error message on login error', () => {
    const toastrSpy = spyOn(toastrService, 'error');
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error('Error')));

    component.submitLogin();

    expect(toastrSpy).toHaveBeenCalledWith('Error al inicar sesion', 'Algo va mal');
  });
});
