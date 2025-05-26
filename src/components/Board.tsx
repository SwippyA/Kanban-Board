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

  // Enhanced colorful column styles with gradients
  const columnColors = {
    backlog: darkMode
      ? 'bg-gradient-to-br from-purple-800 to-purple-600'
      : 'bg-gradient-to-br from-purple-300 to-purple-200',
    'in-progress': darkMode
      ? 'bg-gradient-to-br from-yellow-700 to-yellow-500'
      : 'bg-gradient-to-br from-yellow-300 to-yellow-200',
    done: darkMode
      ? 'bg-gradient-to-br from-green-700 to-green-500'
      : 'bg-gradient-to-br from-green-300 to-green-200',
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
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
          {/* All the colour had import here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Column
              title="Backlog"
              status="backlog"
              tasks={tasks.filter((task) => task.status === 'backlog')}
              className={`${columnColors.backlog} rounded-2xl shadow-xl p-4 border-2 border-white/20`}
              headerClass="text-white font-extrabold text-xl tracking-wide mb-2"
            />

            <Column
              title="In Progress"
              status="in-progress"
              tasks={tasks.filter((task) => task.status === 'in-progress')}
              className={`${columnColors['in-progress']} rounded-2xl shadow-xl p-4 border-2 border-white/20`}
              headerClass="text-white font-extrabold text-xl tracking-wide mb-2"
            />

            <Column
              title="Done"
              status="done"
              tasks={tasks.filter((task) => task.status === 'done')}
              className={`${columnColors.done} rounded-2xl shadow-xl p-4 border-2 border-white/20`}
              headerClass="text-white font-extrabold text-xl tracking-wide mb-2"
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
