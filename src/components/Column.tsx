import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { moveTask } from '../features/tasks/tasksSlice';
import type { Task, TaskStatus } from '../features/tasks/tasksTypes';
import TaskCard from './TaskCard';
// type declaration 
interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  className?: string;     
    headerClass?: string;   
  }

const Column: React.FC<ColumnProps> = ({ title, status, tasks, className = '', headerClass = '' }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      dispatch(moveTask({ id: item.id, newStatus: status }));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  return (
    <div
  ref={ref}
  className={`${className} rounded-2xl p-5 transition-all duration-200 border ${
    isOver ? 'border-blue-500 ring-2 ring-blue-300 bg-blue-50' : 'border-gray-200'
  } ${tasks.length ? 'min-h-[250px]' : 'h-[250px]'} shadow-md`}
>
  <h2 className={`text-2xl font-bold mb-4 ${headerClass}`}>{title}</h2>
      {/* Mapping all the task */}
      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">No tasks yet</p>
        )}
      </div>
    </div>
  );
};

export default Column;
