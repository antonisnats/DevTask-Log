import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { loginAndRegisterGuardGuard } from './guards/login-and-register-guard.guard';

export const routes: Routes = [

  {
    path : 'login', component: LoginComponent, canActivate: [loginAndRegisterGuardGuard]
  },
  {
    path:'register', component: RegisterComponent, canActivate: [loginAndRegisterGuardGuard]
  },
  {
    path: 'homepage', component: HomepageComponent
  },
  {
    path: 'logs', component: LogsComponent
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];