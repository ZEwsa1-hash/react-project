import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BaseNotice, NoteColor } from './types';
import { Notice } from './components/notice';
import { NoticesStore } from './services/localStorage';
import { type Coords } from './components/notice/useDragndrop';

const NOTE_WIDTH = 200;
const NOTE_HEIGHT = 240;
const NOTE_GAP = 16;
const NOTE_START_X = 20;
const NOTE_START_Y = 80;
const isNoteColor = (value: unknown): value is NoteColor =>
  value === 'yellow' ||
  value === 'green' ||
  value === 'blue' ||
  value === 'pink' ||
  value === 'orange' ||
  value === 'white';

const getSafeNoteColor = (value: unknown): NoteColor =>
  isNoteColor(value) ? value : 'yellow';

type NoticeDraft = Omit<BaseNotice, 'color'> & {
  color?: unknown;
};

const getNextPosition = (count: number) => {
  if (typeof window === 'undefined') {
    return { left: NOTE_START_X, top: NOTE_START_Y };
  }

  const perRow = Math.max(
    1,
    Math.floor((window.innerWidth - NOTE_START_X) / (NOTE_WIDTH + NOTE_GAP)),
  );
  const column = count % perRow;
  const row = Math.floor(count / perRow);

  return {
    left: NOTE_START_X + column * (NOTE_WIDTH + NOTE_GAP),
    top: NOTE_START_Y + row * (NOTE_HEIGHT + NOTE_GAP),
  };
};

const NoticeAnimations = () => (
  <style>{`
    @keyframes notice-in {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes notice-out {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.92);
      }
    }
  `}</style>
);

const normalizeNotice = (notice: Partial<NoticeDraft>): BaseNotice => ({
  id: notice.id ?? Date.now().toString(),
  title: notice.title ?? '',
  content: notice.content ?? '',
  top: notice.top ?? NOTE_START_Y,
  left: notice.left ?? NOTE_START_X,
  color: getSafeNoteColor(notice.color),
});

export function NoticePage() {
  const [syncNoticeStorage] = useState<NoticesStore>(() => new NoticesStore());
  const [notices, setNotices] = useState<BaseNotice[]>(() =>
    syncNoticeStorage.notices.map((notice: BaseNotice) => normalizeNotice(notice)),
  );
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const nextNoteIndexRef = useRef(syncNoticeStorage.notices.length);

  const filteredNotices = useMemo<BaseNotice[]>(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return notices;
    }

    return notices.filter(({ title, content }) => {
      return (
        title.toLowerCase().includes(query) || content.toLowerCase().includes(query)
      );
    });
  }, [notices, search]);

  const handleUpdatePosition = useCallback(
    (id: BaseNotice['id'], position: Coords) => {
      setNotices((prevNotices) =>
        prevNotices.map((notice) =>
          notice.id === id
            ? {
                ...notice,
                ...position,
              }
            : notice,
        ),
      );
    },
    [],
  );

  const handleAdd = useCallback(() => {
    const position = getNextPosition(nextNoteIndexRef.current);
    nextNoteIndexRef.current += 1;

    setNotices((prevNotices) => [
      ...prevNotices,
      {
        id: Date.now().toString(),
        title: '',
        content: '',
        color: 'yellow',
        ...position,
      },
    ]);
  }, []);

  const handleRequestRemove = useCallback((inputId: BaseNotice['id']) => {
    setRemovingIds((prevIds) =>
      prevIds.includes(inputId) ? prevIds : [...prevIds, inputId],
    );
  }, []);

  const handleRemove = useCallback((inputId: BaseNotice['id']) => {
    setNotices((prevNotices) => prevNotices.filter(({ id }) => id !== inputId));
    setRemovingIds((prevIds) => prevIds.filter((id) => id !== inputId));
  }, []);

  const handleContentBlur = useCallback(
    (inputId: BaseNotice['id'], value: string) => {
      setNotices((prevNotices) =>
        prevNotices.map((notice: BaseNotice): BaseNotice =>
          notice.id === inputId
            ? {
                ...notice,
                content: value,
              }
            : notice,
        ),
      );
    },
    [],
  );

  const handleTitleBlur = useCallback(
    (inputId: BaseNotice['id'], value: string) => {
      setNotices((prevNotices) =>
        prevNotices.map((notice: BaseNotice): BaseNotice =>
          notice.id === inputId
            ? {
                ...notice,
                title: value.trim(),
              }
            : notice,
        ),
      );
    },
    [],
  );

  const handleColorChange = useCallback(
    (inputId: BaseNotice['id'], color: NoteColor) => {
      const nextColor = getSafeNoteColor(color);
      setNotices((prevNotices) =>
        prevNotices.map((notice: BaseNotice): BaseNotice =>
          notice.id === inputId
            ? {
                ...notice,
                color: nextColor,
              }
            : notice,
        ),
      );
    },
    [],
  );

  const handleClearAll = useCallback(() => {
    if (notices.length === 0) {
      return;
    }

    if (!window.confirm('Удалить все заметки?')) {
      return;
    }

    nextNoteIndexRef.current = 0;
    setRemovingIds(notices.map(({ id }) => id));
  }, [notices]);

  useEffect(() => {
    syncNoticeStorage.sync(notices);
  }, [notices, syncNoticeStorage]);

  return (
    <div>
      <NoticeAnimations />

      <button
        type="button"
        onClick={() => {
          void navigate(-1);
        }}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          padding: '10px 16px',
          borderRadius: 22,
          border: '1px solid #d0d7de',
          background: '#fff',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          zIndex: 1000,
        }}
      >
        Назад
      </button>

      <input
        type="search"
        value={search}
        placeholder="Поиск по заметкам..."
        onChange={(event) => setSearch(event.currentTarget.value)}
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          padding: '9px 18px',
          borderRadius: 24,
          border: '1px solid #ccc',
          fontSize: 14,
          outline: 'none',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          zIndex: 1000,
          background: '#fff',
        }}
      />

      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 1000,
        }}
      >
        <button
          type="button"
          onClick={handleClearAll}
          style={{
            height: 44,
            padding: '0 18px',
            borderRadius: 22,
            border: 'none',
            background: '#e53e3e',
            color: '#fff',
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          Очистить
        </button>
        <button
          type="button"
          onClick={handleAdd}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: 'none',
            background: '#333',
            color: '#fff',
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          +
        </button>
      </div>

      {filteredNotices.map((notice: BaseNotice) => {
        const safeColor = getSafeNoteColor(notice.color);

        return (
          <Notice
            key={notice.id}
            id={notice.id}
            title={notice.title}
            content={notice.content}
            left={notice.left}
            top={notice.top}
            color={safeColor}
            onCardRemove={handleRemove}
            onRemoveRequest={handleRequestRemove}
            onTextBlur={handleContentBlur}
            onTitleBlur={handleTitleBlur}
            onColorChange={handleColorChange}
            onDragEnd={handleUpdatePosition}
            isRemoving={removingIds.includes(notice.id)}
          />
        );
      })}
    </div>
  );
}
