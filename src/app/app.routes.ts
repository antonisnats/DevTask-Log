import { Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'homepage', pathMatch: 'full'
  },
  {
    path: 'homepage', component: HomepageComponent
  },
  {
    path: 'logs', component: LogsComponent
  }
];
