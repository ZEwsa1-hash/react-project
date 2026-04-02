import { memo, useCallback } from 'react';
import { PRIORITY_LABELS, type TaskItemProps } from '../types/types';
import './TaskItem.css';

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const handleToggle = useCallback(() => onToggle(task.id), [onToggle, task.id]);
  const handleDelete = useCallback(() => onDelete(task.id), [onDelete, task.id]);

  return (
    <li className="task-item">
      <input
        className="task-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Отметить "${task.text}" как ${
          task.completed ? 'невыполненную' : 'выполненную'
        }`}
      />
      <span
        className={`task-item__text${
          task.completed ? ' task-item__text--done' : ''
        }`}
      >
        {task.text}
      </span>
      <span className={`task-item__badge task-item__badge--${task.priority}`}>
        {PRIORITY_LABELS[task.priority]}
      </span>
      <button
        className="task-item__delete"
        onClick={handleDelete}
        aria-label={`Удалить "${task.text}"`}
        title="Удалить задачу"
      >
        ×
      </button>
    </li>
  );
});

export default TaskItem;
