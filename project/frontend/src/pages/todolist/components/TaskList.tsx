import { memo } from 'react';
import type { TaskListProps } from '@/pages/todolist/types/types';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = memo(function TaskList({
  tasks,
  toggleTask,
  deleteTask,
}: TaskListProps) {
  return (
    <section className="task-list">
      <div className="task-list__header">
        <h2 className="task-list__title">Задачи</h2>
        <span className="task-list__count">{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="task-list__empty">Задач пока нет. Добавьте первую выше!</p>
      ) : (
        <ul className="task-list__ul">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
});

export default TaskList;
