export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Tech {
  name: string;
}

export interface Session {
  title: string;
  date: string;
  notes: string;
  timeSpent: number;      
  difficulty: Difficulty | ''; 
  techUsed: Tech[];
}