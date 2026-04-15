import { Component, computed, inject, signal } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {
  private sessionService = inject(SessionService);

  logsSessions = this.sessionService.sessions;

  filters = signal<string[]>(['All Tasks', 'React', 'Angular', 'Vue', 'Node.js', 'Python',
    'SQL', 'TypeScript', 'AWS', 'Docker', 'GraphQL']); //na ginei model key,value objects kai to value epeidh tha einai dunamiko na passarw mesa sto object to array

  activeFilter = signal<string>('All Tasks');

  filteredSessions = computed(() => {
    if (this.activeFilter() === 'All Tasks') {
      return this.logsSessions();
    }

    return this.logsSessions().filter(session =>
      session.techUsed.includes(this.activeFilter())
    );
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }
}
