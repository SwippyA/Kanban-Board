import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Column from './Column';
import TaskForm from './TaskForm';
import ThemeToggle from './ThemeToggle';
import { usePersistState } from '../hooks/usePersistState';

const Board: React.FC = () => {
  usePersistState();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const darkMode = useSelector((state: RootState) => state.tasks.darkMode);
  const [showForm, setShowForm] = useState(false);

  // Color classes for columns, adjusted for dark/light mode
  const columnColors = {
    backlog: darkMode ? 'bg-purple-700' : 'bg-purple-300',
    'in-progress': darkMode ? 'bg-yellow-700' : 'bg-yellow-300',
    done: darkMode ? 'bg-green-700' : 'bg-green-300',
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight">Kanban Board</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setShowForm(true)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all duration-200"
              >
                + Add Task
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mb-6">
              <TaskForm onClose={() => setShowForm(false)} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Column
  title="Backlog"
  status="backlog"
  tasks={tasks.filter(task => task.status === 'backlog')}
  className={`${columnColors.backlog} rounded-lg shadow-md p-4`}
  headerClass="text-white font-bold text-lg"
/>

<Column
  title="In Progress"
  status="in-progress"
  tasks={tasks.filter(task => task.status === 'in-progress')}
  className={`${columnColors['in-progress']} rounded-lg shadow-md p-4`}
  headerClass="text-white font-bold text-lg"
/>

<Column
  title="Done"
  status="done"
  tasks={tasks.filter(task => task.status === 'done')}
  className={`${columnColors.done} rounded-lg shadow-md p-4`}
  headerClass="text-white font-bold text-lg"
/>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
