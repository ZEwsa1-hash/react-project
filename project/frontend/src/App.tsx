import './App.css';
import { Navigate, Route, Routes } from 'react-router';
import { PrivateRoute } from './components/PrivateRoute';
import { ROUTES } from './constants/routes';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { NoticePage } from './pages/notice';
import { ToDoList } from './pages/todolist';

export function App() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.notice} element={<NoticePage />} />
        <Route path={ROUTES.todolist} element={<ToDoList />} />
      </Route>
      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  );
}
