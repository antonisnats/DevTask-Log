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

  private sessionSignal = signal<Session[]>([]);

  sessions = this.sessionSignal.asReadonly();

  addSession(session: Session) {
    this.sessionSignal.update(current => [...current, session]);
  }
}
