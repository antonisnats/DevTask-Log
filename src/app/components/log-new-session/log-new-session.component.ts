import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Validators } from '../../models/validators.model';

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
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './log-new-session.component.html',
  styleUrls: ['./log-new-session.component.scss'],
})
export class LogNewSessionComponent {

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

  protected signalSubmission = signal<Session | undefined>(undefined);

  protected hasError = computed(() =>
    !!(this.signalErrors().title || this.signalErrors().timeSpent || this.signalErrors().techUsed)
  );

  protected signalErrors = computed(() => {
    const model = this.signalModel();

    return { //na ginei opws to ROUTES
      title: !model.title.trim() ? Validators.title : null,
      timeSpent: (!model.timeSpent || model.timeSpent <= 0) ? Validators.timeSpent : null,
      techUsed: model.techUsed.length === 0 ? Validators.techUsed : null,
    };
  });

  protected updateSignal(field: keyof Session, value: string | string[] | number | Difficulty): void {
    this.signalModel.update((current) => ({
      ...current,
      [field]: value
    }));
  }

  protected toggleTech(tech: string): void {
    const current = this.signalModel().techUsed;
    const updated = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech];

    this.updateSignal('techUsed', updated);
  }

  protected setDifficulty(level: Difficulty): void {
    this.updateSignal('difficulty', level);
  }

  protected submitSignal(): void {
    if (this.hasError()) {
      return;
    }
    this.signalSubmission.set(this.signalModel());
    this.resetForm();
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
}