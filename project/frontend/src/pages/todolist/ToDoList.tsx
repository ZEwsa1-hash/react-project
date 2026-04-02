import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Analytics from './components/Analytics';
import type { Priority, Task } from './types/types';
import './ToDoList.css';

export function ToDoList() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const navigate = useNavigate();

  const addTask = useCallback(
    (text: string, priority: Priority) => {
      setTasks((prev: Task[]) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text,
          completed: false,
          priority,
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    [setTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev: Task[]) =>
        prev.map((task: Task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev: Task[]) =>
        prev.filter((task: Task) => task.id !== id),
      );
    },
    [setTasks],
  );

  return (
    <div className="app">
      <header className="app-header">
        <button
          type="button"
          className="app-back-btn"
          onClick={() => {
            void navigate(-1);
          }}
        >
          Назад
        </button>
        <span className="app-title">Todo App</span>
      </header>

      <main className="app-main">
        <TaskForm onAdd={addTask} />
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
        <Analytics tasks={tasks} />
      </main>
    </div>
  );
}

export default ToDoList;
