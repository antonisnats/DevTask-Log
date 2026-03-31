import { Injectable, signal } from '@angular/core';

export type UserRole = 'admin' | 'none';

@Injectable({ providedIn: 'root' })
export class RoleSelectionService {
  readonly role = signal<UserRole | null>(null);

  constructor() {
    const persisted = window.localStorage.getItem('role') as UserRole | null;
    if (persisted === 'admin') {
      this.role.set(persisted);
    }
  }

  selectRole(promptText = 'Access only if selected role is "admin"'): UserRole | null {
    const input = window.prompt(promptText, this.role() ?? undefined)?.toLowerCase();
    if (input === 'admin') {
      this.role.set(input);
      window.localStorage.setItem('role', input);
      return input;
    }
    return null;
  }

  clearRole(): void {
    this.role.set('none');
    window.localStorage.removeItem('role');
  }
}
