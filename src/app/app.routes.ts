import { FormEditarEventComponent } from './components/form-editar-event/form-editar-event.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { FormEventComponent } from './components/form-event/form-event.component';
import { LoginComponent } from './components/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'espacio/:id', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'crear-reserva/espacio/:id', component: FormEventComponent, canActivate: [AuthGuard] },
  { path: 'editar-reserva/:id', component: FormEditarEventComponent, canActivate: [AuthGuard] },
  { path: 'mis-reservas', component: MyEventsComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];
