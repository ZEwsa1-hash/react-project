export type NoteColor =
  | 'yellow'
  | 'green'
  | 'blue'
  | 'pink'
  | 'orange'
  | 'white';

export type BaseNotice = {
  id: string;
  title: string;
  content: string;
  top: number;
  left: number;
  color: NoteColor;
};
