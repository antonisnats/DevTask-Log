import { Component, signal, inject, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionSnackbarComponent } from '../../session-snackbar/session-snackbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Difficulty, Session } from '../../models/session-model';

@Component({
  selector: 'app-log-new-session',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, FormField],
  templateUrl: './log-new-session.component.html',
  styleUrls: ['./log-new-session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogNewSessionComponent {

  private sessionService = inject(SessionService);
  private snackBar = inject(MatSnackBar);

  @Output() close = new EventEmitter<void>();

  readonly DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  readonly TECH_OPTIONS = [
    'React', 'Angular', 'Vue', 'Node.js', 'Python',
    'SQL', 'TypeScript', 'AWS', 'Docker', 'GraphQL'
  ];

  signalModel = signal<Session>({
    title: '',
    date: '',
    notes: '',
    timeSpent: 0,
    difficulty: '',
    techUsed: []
  });

  protected sessionForm = form(this.signalModel, (fieldPath) => {
    required(fieldPath.title);
    required(fieldPath.timeSpent);
    required(fieldPath.notes);
  });

  toggleTech(tech: string): void {
    const current = this.signalModel().techUsed;
    const updated = current.some(t => t.name === tech)
      ? current.filter(t => t.name !== tech)
      : [...current, { name: tech }];
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
      difficulty: ''
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.sessionService.saveSession(this.signalModel());
    this.resetForm();
    this.sessionForm().reset();
    this.snackBar.openFromComponent(SessionSnackbarComponent, { duration: 3000 });
  }

  cancelForm(): void {
    this.close.emit();
  }

}