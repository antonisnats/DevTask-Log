import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LogsComponent } from './components/logs/logs.component';

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
