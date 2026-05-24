import { Injectable, signal } from '@angular/core';
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

  //na kanw olous tous ypologismous pou kanw sto homepage component
}
