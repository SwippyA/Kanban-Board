import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskStatus, TasksState } from './tasksTypes';

const initialState: TasksState = {
  tasks: [],
  darkMode: false,
  history: {
    past: [],
    present: [],
    future: [],
  },
};

function saveToHistory(state: TasksState) {
  state.history = {
    past: [...state.history.past, state.history.present],
    present: [...state.tasks],
    future: [],
  };
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        createdAt: Date.now(),
        ...action.payload,
      };
      saveToHistory(state);
      state.tasks.push(newTask);
    },

    loadTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },

    moveTask: (state, action: PayloadAction<{ id: string; newStatus: TaskStatus }>) => {
      saveToHistory(state);
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.newStatus;
      }
    },

    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      saveToHistory(state);
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    undo: (state) => {
      if (state.history.past.length > 0) {
        const previous = state.history.past[state.history.past.length - 1];
        const newPast = state.history.past.slice(0, -1);
        state.history = {
          past: newPast,
          present: previous,
          future: [state.history.present, ...state.history.future],
        };
        state.tasks = previous;
      }
    },

    redo: (state) => {
      if (state.history.future.length > 0) {
        const next = state.history.future[0];
        const newFuture = state.history.future.slice(1);
        state.history = {
          past: [...state.history.past, state.history.present],
          present: next,
          future: newFuture,
        };
        state.tasks = next;
      }
    },
  },
});


export const {
  addTask,
  moveTask,
  editTask,
  deleteTask,
  toggleDarkMode,
  undo,
  redo,
  loadTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
