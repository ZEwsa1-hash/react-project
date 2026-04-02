import type { CSSProperties } from 'react';
import type { NoteColor } from '@/pages/notice/types';

export const NOTICE_COLORS: Record<NoteColor, string> = {
  yellow: '#fff9c4',
  green: '#c8e6c9',
  blue: '#bbdefb',
  pink: '#f8bbd0',
  orange: '#ffe0b2',
  white: '#ffffff',
};

const getNoticeColor = (color: NoteColor) => {
  switch (color) {
    case 'yellow':
      return NOTICE_COLORS.yellow;
    case 'green':
      return NOTICE_COLORS.green;
    case 'blue':
      return NOTICE_COLORS.blue;
    case 'pink':
      return NOTICE_COLORS.pink;
    case 'orange':
      return NOTICE_COLORS.orange;
    case 'white':
      return NOTICE_COLORS.white;
  }
};

export const style = {
  card: (color: NoteColor, isRemoving: boolean): CSSProperties => ({
    width: 200,
    minHeight: 220,
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: 14,
    padding: 10,
    backgroundColor: getNoticeColor(color),
    overflow: 'hidden',
    position: 'absolute',
    boxSizing: 'border-box',
    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    cursor: 'grab',
    animation: isRemoving ? 'notice-out 0.2s ease forwards' : 'notice-in 0.2s ease',
  }),
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  titleInput: {
    flexGrow: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'inherit',
    cursor: 'text',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  removeButton: {
    flexShrink: 0,
    padding: '0 4px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    fontSize: 18,
    lineHeight: '1',
    color: '#666',
  },
  textarea: {
    width: '100%',
    minHeight: 120,
    resize: 'vertical',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: 8,
    outline: 'none',
    padding: 7,
    fontSize: 12,
    fontFamily: 'inherit',
    background: 'rgba(255,255,255,0.5)',
    cursor: 'text',
    boxSizing: 'border-box',
    lineHeight: '1.5',
  },
  colorRow: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  colorSwatch: (selected: boolean, color: NoteColor): CSSProperties => ({
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: getNoticeColor(color),
    border: selected ? '2px solid #444' : '1px solid #bbb',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
  }),
} as const;
