import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../features/tasks/tasksSlice';
import type { Task } from '../features/tasks/tasksTypes';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);

  const handleUpdate = () => {
    dispatch(editTask(editedTask));
    setIsEditing(false);
  };

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`p-4 rounded-xl shadow-md border transition duration-200 ${
        isEditing ? 'bg-indigo-100 dark:bg-indigo-900' : 'bg-white dark:bg-gray-800'
      } border-gray-200 dark:border-gray-700 cursor-move`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-1 text-sm rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-1 text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{task.title}</h3>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{task.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-xs rounded-md bg-indigo-500 hover:bg-indigo-600 text-white transition"
              >
                Update
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="px-3 py-1 text-xs rounded-md bg-red-500 hover:bg-red-600 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
