# Plan: New Project — react-project

## Goal
Create new repo `C:\Users\denli\Documents\GitHub\react-project` based on React-3, rewriting both user projects in React TypeScript.

---

## Step 1: Create New Repo

Copy React-3 to react-project and reinitialize git:

```bash
cp -r /c/Users/denli/Documents/GitHub/React-3 /c/Users/denli/Documents/GitHub/react-project
cd /c/Users/denli/Documents/GitHub/react-project
rm -rf .git
git init
git add .
git commit -m "init: initial project setup"
```

---

## Step 2: Notice Page — Rewrite (vanilla JS → React TS)

Source: `C:\Users\denli\Documents\GitHub\notes\src\`

**Features to port from `notes` repo:**
- Color picker (6 colors: yellow, green, blue, pink, orange, white)
- Real-time search by title + content
- "Clear all" button with confirm()
- Smart positioning for new notes (grid: +30px offset, reset on overflow)
- Editable title directly on card (not via `prompt()`)
- CSS animations (note-in / note-out keyframes)

**Files to update in `react-project`:**

### `project/frontend/src/pages/notice/types.ts`
```ts
export type NoteColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange' | 'white'

export type BaseNotice = {
  id: string
  title: string
  content: string
  top: number
  left: number
  color: NoteColor
}
```

### `project/frontend/src/pages/notice/NoticePage.tsx`
- Add `search` state + filter notices by title/content
- Replace `prompt()` with inline title input on card
- Smart position calculation for new notes
- "Очистить всё" button with `confirm()`
- Toolbar: [+ Добавить] [🔍 Search input] [🗑 Очистить всё]

### `project/frontend/src/pages/notice/components/notice/index.tsx`
- Editable `title` input (instead of `<h4>`)
- Color picker: row of 6 colored circles at bottom of card
- Apply `backgroundColor` from `note.color`
- Emit `onTitleChange(id, value)` on blur

### `project/frontend/src/pages/notice/components/notice/style.ts`
- Update card style: `backgroundColor` from props (dynamic)
- Add `.colorSwatch` styles (18px circle, cursor pointer, border on selected)
- Add CSS keyframe animation classes

---

## Step 3: TodoList Page — Port (React JSX → React TS)

Source: `C:\Users\denli\Documents\GitHub\todo-app-hw\src\`

**Features to port:**
- `Analytics` component (useMemo: total, completed, pending, progress bar, priority breakdown, most popular priority)

**Files to create:**

### `project/frontend/src/pages/todolist/components/Analytics.tsx`
Port from `todo-app-hw/src/components/Analytics.jsx`:
- Props: `{ tasks: Task[] }`
- useMemo for all stats
- Progress bar (completed / total %)
- Priority breakdown list
- "Most popular priority" indicator

### `project/frontend/src/pages/todolist/components/Analytics.css`
Copy and adapt from `todo-app-hw/src/components/Analytics.css`

**Files to update:**

### `project/frontend/src/pages/todolist/ToDoList.tsx`
- Uncomment and add `<Analytics tasks={savedTasks} />`
- Uncomment scroll-to-list button and `scrollToList` handler

---

## What NOT to change
- Auth flow (login: Gary, pass: 123 — backend hardcoded)
- Routing (App.tsx, ROUTES constants)
- `useDragndrop` hook (already well implemented)
- `useLocalStorage` hook
- `ThemeContext`, `ThemeToggle`
- Home page
- Backend `server.js`

---

## Verification

```bash
# Terminal 1
cd project/backend && node server.js

# Terminal 2
cd project/frontend && npm run dev

# Test checklist:
# 1. Login with Gary / 123
# 2. Notice: create note → type title on card → pick color → search → clear all → drag
# 3. TodoList: add tasks → Analytics shows progress bar + breakdown
```

---

## Source Repos (read-only reference)
- Notes: `C:\Users\denli\Documents\GitHub\notes\src\`
- Todo: `C:\Users\denli\Documents\GitHub\todo-app-hw\src\`
- Base: `C:\Users\denli\Documents\GitHub\React-3\`
`