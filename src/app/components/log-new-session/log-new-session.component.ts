import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule,MatButtonModule],
  templateUrl: './log-new-session.component.html',
  styleUrls: ['./log-new-session.component.scss'],
})
export class LogNewSessionComponent {

  techOptions = [
    'React','Angular','Vue','Node.js','Python',
    'SQL','TypeScript','AWS','Docker','GraphQL'
  ];

  difficulties: Difficulty[] = ['Easy','Medium','Hard'];

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

    return messages;
  });

  protected get signalValid(): boolean {
    return this.signalErrors().length === 0;
  }

  protected updateSignal(field: keyof Session, value: any): void {
    this.signalModel.update((current) => ({
      ...current,
      [field]: value
    }));
  }

  protected toggleTech(tech: string) {
    const model = this.signalModel();

    const updated = model.techUsed.includes(tech)
      ? model.techUsed.filter(t => t !== tech)
      : [...model.techUsed, tech];

    this.updateSignal('techUsed', updated);
  }

  protected setDifficulty(level: Difficulty) {
    this.updateSignal('difficulty', level);
  }

  protected submitSignal(): void {
    if (!this.signalValid) {
      return;
    }
    this.signalSubmission.set(this.signalModel());
  }
}