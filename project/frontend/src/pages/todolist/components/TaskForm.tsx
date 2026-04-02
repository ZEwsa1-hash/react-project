import {
  memo,
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import type { Priority, TaskFormProps } from '../types/types';
import './TaskForm.css';

const TaskForm = memo(function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    onAdd(trimmed, priority);
    setText('');
  };

  return (
    <section className="task-form">
      <h2 className="task-form__title">Новая задача</h2>
      <form onSubmit={handleSubmit}>
        <div className="task-form__row">
          <input
            ref={inputRef}
            className="task-form__input"
            type="text"
            placeholder="Что нужно сделать?"
            value={text}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setText(event.currentTarget.value)
            }
            maxLength={200}
          />
          <select
            className="task-form__select"
            value={priority}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setPriority(event.currentTarget.value as Priority)
            }
          >
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
          <button type="submit" className="task-form__btn">
            Добавить
          </button>
        </div>
      </form>
    </section>
  );
});

export default TaskForm;
