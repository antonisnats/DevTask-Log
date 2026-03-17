import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [

  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path : 'login', component: LoginComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path: 'homepage', component: HomepageComponent
  },
  {
    path: 'logs', component: LogsComponent
  }
];