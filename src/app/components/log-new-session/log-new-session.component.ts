import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

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

  protected signalErrors = computed(() => {
    const model = this.signalModel();
    const messages: string[] = [];

    if (!model.title.trim()) {
      messages.push('Task title is required.');
    }

    if (!model.timeSpent || model.timeSpent <= 0) {
      messages.push('Time spent must be greater than 0.');
    }

    if (model.techUsed.length === 0) {
      messages.push('Select at least one technology.');
    }

    return { hasError: messages.length > 0, messages };
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
    if (this.signalErrors().hasError) {
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