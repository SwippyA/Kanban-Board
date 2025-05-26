import type { Task } from './../features/tasks/tasksTypes';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loadTasks } from '../features/tasks/tasksSlice';

const STORAGE_KEY = 'kanban-tasks';

export const usePersistState = () => {
  const dispatch = useDispatch();

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const tasks: Task[] = JSON.parse(savedTasks);
        console.log('Loaded tasks from localStorage:', tasks);
        dispatch(loadTasks(tasks));
      } catch (error) {
        console.error('Failed to parse saved tasks', error);
      }
    }
  }, [dispatch]);

  // Save to localStorage (wrapped in useCallback for stable reference)
  const saveTasks = useCallback((tasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      console.log('Saved tasks to localStorage:', tasks);
    } catch (error) {
      console.error('Failed to save tasks', error);
    }
  }, []);

  return { saveTasks };
};
