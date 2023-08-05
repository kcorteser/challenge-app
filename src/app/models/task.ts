export interface Task {
  id?: number;
  name: string;
  description: string;
  expirationDate: Date | null;
  isComplete: boolean;
}
