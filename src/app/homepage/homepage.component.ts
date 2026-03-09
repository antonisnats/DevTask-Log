import { Component, signal } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { LogNewSessionComponent } from '../log-new-session/log-new-session.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavigationBarComponent,LogNewSessionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  
  showForm = signal(false);

  openForm() {
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }
}
