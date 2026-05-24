import { Component, computed, inject, signal } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { LogNewSessionComponent } from '../log-new-session/log-new-session.component';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavigationBarComponent, LogNewSessionComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


  ngOnInit() {
    console.log(this.sessionService);
    console.log(this.sessionService.sessions().forEach(session => {
      session.techUsed, session.timeSpent;
    }));
  }

  showForm = signal(false);
  private sessionService = inject(SessionService);

  openForm() {
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  totalTasks = computed(() => {
    return this.sessionService.sessions().length;
  })

  totalHours = computed(() => {
    return this.sessionService.sessions().reduce((total,session) => {
      return total + session.timeSpent;
    }, 0)
  })

  hoursPerTechnology = computed(() => {
    return  this.sessionService.sessions().forEach(session => {
      session.techUsed, session.timeSpent;
    })
  })
  

}
