import { memo, useMemo } from 'react';
import './Analytics.css';
import {
  PRIORITY_LABELS,
  type Priority,
  type Task,
} from '@/pages/todolist/types/types';

type Props = {
  tasks: Task[];
};

const priorities: Priority[] = ['high', 'medium', 'low'];

const Analytics = memo(function Analytics({ tasks }: Props) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const byPriority = tasks.reduce<Record<Priority, number>>(
      (accumulator, task) => {
        accumulator[task.priority] = (accumulator[task.priority] ?? 0) + 1;
        return accumulator;
      },
      { high: 0, medium: 0, low: 0 },
    );

    const mostPopularEntry = Object.entries(byPriority)
      .filter(([, value]) => value > 0)
      .sort((first, second) => second[1] - first[1])[0];

    return {
      total,
      completed,
      pending,
      percent,
      byPriority,
      mostPopular: (mostPopularEntry?.[0] as Priority | undefined) ?? null,
    };
  }, [tasks]);

  return (
    <section className="analytics">
      <h2 className="analytics__title">Аналитика</h2>

      <div className="analytics__stats">
        <div className="analytics__stat">
          <div className="analytics__stat-value">{stats.total}</div>
          <div className="analytics__stat-label">Всего</div>
        </div>
        <div className="analytics__stat">
          <div className="analytics__stat-value">{stats.completed}</div>
          <div className="analytics__stat-label">Выполнено</div>
        </div>
        <div className="analytics__stat">
          <div className="analytics__stat-value">{stats.pending}</div>
          <div className="analytics__stat-label">Осталось</div>
        </div>
      </div>

      <div className="analytics__progress-label">
        <span>Прогресс</span>
        <span>{stats.percent}%</span>
      </div>
      <div className="analytics__progress-bar">
        <div
          className="analytics__progress-fill"
          style={{ width: `${stats.percent}%` }}
          role="progressbar"
          aria-valuenow={stats.percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="analytics__priority">
        <div className="analytics__priority-title">По приоритету</div>
        {priorities.map((priority) => (
          <div key={priority} className="analytics__priority-row">
            <span
              className={`analytics__priority-dot analytics__priority-dot--${priority}`}
            />
            <span className="analytics__priority-name">
              {PRIORITY_LABELS[priority]}
            </span>
            <span className="analytics__priority-count">
              {stats.byPriority[priority]}
            </span>
          </div>
        ))}
      </div>

      {stats.mostPopular && (
        <div className="analytics__popular">
          Популярнее всего: <span>{PRIORITY_LABELS[stats.mostPopular]}</span>
        </div>
      )}
    </section>
  );
});

export default Analytics;
