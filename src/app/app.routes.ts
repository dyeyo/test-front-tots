
import { FormEditarEventComponent } from './components/form-editar-event/form-editar-event.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { FormEventComponent } from './components/form-event/form-event.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'espacio/:id', component: DetailsComponent },
  { path: 'crear-reserva/espacio/:id', component: FormEventComponent },
  { path: 'editar-reserva/:id', component: FormEditarEventComponent },
  { path: 'mis-reservas', component: MyEventsComponent },
  { path: 'abm', component: AdminComponent, canActivate: [AdminGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
