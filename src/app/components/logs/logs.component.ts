import { Component, computed, inject, signal } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {
  private sessionService = inject(SessionService);
  private router = inject(Router);

  logsSessions = this.sessionService.sessions;

  filters = signal<string[]>(['All Tasks', 'React', 'Angular', 'Vue', 'Node.js', 'Python',
    'SQL', 'TypeScript', 'AWS', 'Docker', 'GraphQL']);

  activeFilter = signal<string>('All Tasks');

  filteredSessions = computed(() => {
    if (this.activeFilter() === 'All Tasks') {
      return this.logsSessions();
    }

    return this.logsSessions().filter(session =>
      session.techUsed.some(t => t.name = this.activeFilter())
    );
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

}
