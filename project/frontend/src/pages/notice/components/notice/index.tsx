import {
  useEffect,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import type { BaseNotice, NoteColor } from '@/pages/notice/types';
import { style } from './style';
import {
  useDragndrop,
  type Coords,
} from '@/pages/notice/components/notice/useDragndrop';

type Props = BaseNotice & {
  onCardRemove: (id: string) => void;
  onRemoveRequest: (id: string) => void;
  onTextBlur: (id: string, value: string) => void;
  onTitleBlur: (id: string, value: string) => void;
  onColorChange: (id: string, color: NoteColor) => void;
  onDragEnd: (id: string, coords: Coords) => void;
  isRemoving: boolean;
};

const colorOptions = [
  'yellow',
  'green',
  'blue',
  'pink',
  'orange',
  'white',
] as const satisfies readonly NoteColor[];

export const Notice = ({
  id,
  title,
  content,
  left,
  top,
  color,
  onCardRemove,
  onRemoveRequest,
  onTextBlur,
  onTitleBlur,
  onColorChange,
  onDragEnd,
  isRemoving,
}: Props) => {
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftContent, setDraftContent] = useState(content);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  useEffect(() => {
    setDraftContent(content);
  }, [content]);

  const { setElement } = useDragndrop((coords) => onDragEnd(id, coords));

  return (
    <div
      style={{ ...style.card(color, isRemoving), top, left }}
      ref={setElement}
      onAnimationEnd={() => {
        if (isRemoving) {
          onCardRemove(id);
        }
      }}
    >
      <div style={style.title}>
        <input
          type="text"
          value={draftTitle}
          placeholder="Title..."
          style={style.titleInput}
          onMouseDown={(event: MouseEvent<HTMLInputElement>) =>
            event.stopPropagation()
          }
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDraftTitle(event.currentTarget.value)
          }
          onBlur={() => onTitleBlur(id, draftTitle)}
        />
        <button
          type="button"
          aria-label="Remove note"
          style={style.removeButton}
          onMouseDown={(event: MouseEvent<HTMLButtonElement>) =>
            event.stopPropagation()
          }
          onClick={() => onRemoveRequest(id)}
        >
          x
        </button>
      </div>

      <div style={style.colorRow}>
        {colorOptions.map((option) => (
          <button
            key={option}
            type="button"
            aria-label={`Set ${option} color`}
            style={style.colorSwatch(option === color, option)}
            onMouseDown={(event: MouseEvent<HTMLButtonElement>) =>
              event.stopPropagation()
            }
            onClick={() => onColorChange(id, option)}
          />
        ))}
      </div>

      <textarea
        value={draftContent}
        onMouseDown={(event: MouseEvent<HTMLTextAreaElement>) =>
          event.stopPropagation()
        }
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setDraftContent(event.currentTarget.value)
        }
        onBlur={() => onTextBlur(id, draftContent)}
        style={style.textarea}
      />
    </div>
  );
};
