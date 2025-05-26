import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Board from './components/Board';
import { usePersistState } from './hooks/usePersistState';
import type { RootState } from './store';

const App: React.FC = () => {
  const { saveTasks } = usePersistState();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const darkMode = useSelector((state: RootState) => state.tasks.darkMode);

  useEffect(() => {
    if (tasks) {
      saveTasks(tasks);
    }
  }, [tasks, saveTasks]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-gray-900'
      }`}
    >
      <Board />
    </div>
  );
};

export default App;
