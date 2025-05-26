// features/tasks/tasksTypes.ts
export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
}

export type TaskStatus = 'backlog' | 'in-progress' | 'done';

export interface ITasksState {
  tasks: ITask[];
  darkMode: boolean;
  history: {
    past: ITask[][];
    present: ITask[];
    future: ITask[][];
  };
}

// Alias for backward compatibility
export type Task = ITask;
export type TasksState = ITasksState;