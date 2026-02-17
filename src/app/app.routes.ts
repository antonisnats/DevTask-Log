import { Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LogsComponent } from './logs/logs.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'homepage', pathMatch: 'full'
  },
  {
    path: 'homepage', component: NavigationBarComponent
  },
  {
    path: 'logs', component: LogsComponent
  }
];
