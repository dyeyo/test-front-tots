import { environment } from './../../../environments/environment';
import { EventsService } from './../../services/events.service';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details-event',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details-event.component.html',
  styleUrl: './details-event.component.css',
})
export class DetailsEventComponent implements OnInit {
  espacioId: string | null = null;
  eventsService = inject(EventsService);
  route = inject(ActivatedRoute);
  event: any = [];
  urlMedia: String = environment.url_media

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.espacioId = params['id'];
    });
    this.getDetail()
  }

  getDetail() {
    this.eventsService.getOneEvent(this.espacioId).subscribe((res:any) => {
      this.event = res;
    });
  }
}
