import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export type ThemeProviderProps = {
  children: ReactNode;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const PRIORITY_LABELS = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
} as const;

export type Priority = keyof typeof PRIORITY_LABELS;

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
}

export type TaskFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

export interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}
