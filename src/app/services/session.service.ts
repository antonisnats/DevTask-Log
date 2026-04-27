import { Injectable, signal } from '@angular/core';


type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Session = {
  title: string;
  date: string;
  timeSpent: number;
  techUsed: string[];
  notes: string;
  difficulty: Difficulty;
}

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
}
