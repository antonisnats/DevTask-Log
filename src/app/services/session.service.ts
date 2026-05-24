import { computed, Injectable, signal } from '@angular/core';
import { Session } from '../models/session-model';


type Difficulty = 'Easy' | 'Medium' | 'Hard';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  private sessionSignal = signal<Session[]>(
    JSON.parse(localStorage.getItem('sessions') ?? '[]')
  );

  sessions = this.sessionSignal.asReadonly();

  saveSession(session: Session) {
    this.sessionSignal.update(current => {
      const updated = [...current, session];
      localStorage.setItem('sessions', JSON.stringify(updated));
      return updated;
    });
  }

  totalTasks = computed(() => {
    return this.sessions().length;
  })

  totalHours = computed(() => {
    return this.sessions().reduce((total, session) => {
      return total + session.timeSpent;
    }, 0)
  })

  hoursPerTechnology = computed(() => {
    const map = new Map<string, number>();

    this.sessions().forEach(session => {
      session.techUsed.forEach(tech => {
        map.set(tech.name, session.timeSpent)
      });
    });
     return [...map.entries()].map(([name,timeSpent]) => ({name, timeSpent}));
  })
}
