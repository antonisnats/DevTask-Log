import { Component, signal, inject, Output, EventEmitter, computed } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionSnackbarComponent } from '../../session-snackbar/session-snackbar.component';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

type Session = {
  title: string;
  date: string;
  timeSpent: number;
  techUsed: string[];
  notes: string;
  difficulty: Difficulty;
};

@Component({
  selector: 'app-log-new-session',
  standalone: true,
  imports: [FormField, MatButtonModule],
  templateUrl: './log-new-session.component.html',
  styleUrls: ['./log-new-session.component.scss'],
})
export class LogNewSessionComponent {

  private sessionService = inject(SessionService);
  private snackBar = inject(MatSnackBar);

  @Output() close = new EventEmitter<void>();

  readonly TECH_OPTIONS = [
    'React', 'Angular', 'Vue', 'Node.js', 'Python',
    'SQL', 'TypeScript', 'AWS', 'Docker', 'GraphQL'
  ];

  readonly DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  protected signalModel = signal<Session>({
    title: '',
    date: '',
    timeSpent: 0,
    techUsed: [],
    notes: '',
    difficulty: 'Medium'
  });

  protected sessionForm = form(this.signalModel, (fieldPath) => {
    required(fieldPath.title);
    required(fieldPath.timeSpent);
    required(fieldPath.techUsed);
  });


  protected toggleTech(tech: string): void {
    const current = this.signalModel().techUsed;
    const updated = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech];
    this.signalModel.update(s => ({ ...s, techUsed: updated }));
  }

  protected setDifficulty(level: Difficulty): void {
    this.signalModel.update(s => ({ ...s, difficulty: level }));
  }

  private resetForm(): void {
    this.signalModel.set({
      title: '',
      date: '',
      timeSpent: 0,
      techUsed: [],
      notes: '',
      difficulty: 'Medium'
    });
  }

  protected submit(): void {
    if (!this.sessionForm().valid()) return;

    this.sessionService.saveSession(this.signalModel());
    this.snackBar.openFromComponent(SessionSnackbarComponent, { duration: 3000 });
    this.resetForm();
  }

  cancelForm(): void {
    this.close.emit();
  }
}