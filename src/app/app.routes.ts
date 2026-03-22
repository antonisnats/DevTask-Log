import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path : 'login', component: LoginComponent, canActivate: [guestGuard]
  },
  {
    path:'register', component: RegisterComponent, canActivate: [guestGuard]
  },
  {
    path: 'homepage', component: HomepageComponent, canActivate: [authGuard]
  },
  {
    path: 'logs', component: LogsComponent, canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];