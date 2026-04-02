import { ROUTES } from '@/constants/routes';
import { useAuthContext } from '@/contexts/auth-context';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Login = () => {
  const navigate = useNavigate();
  const { login: fetchLogin } = useAuthContext() ?? {};

  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!login || !pass || !fetchLogin) {
      setError('Enter login and password');
      return;
    }

    try {
      setError('');
      await fetchLogin({ login, pass });
      navigate(ROUTES.home);
    } catch (input) {
      setError(
        input instanceof Error ? input.message : 'Login failed',
      );
    }
  };

  return (
    <div>
      <input
        value={login}
        onChange={({ target: { value } }) => setLogin(value)}
        placeholder="Input login"
      />
      <br />
      <input
        value={pass}
        type="password"
        onChange={({ target: { value } }) => setPass(value)}
        placeholder="Input password"
      />
      <br />
      <button
        onClick={() => {
          void handleLogin();
        }}
      >
        Log in
      </button>
      {error ? <p>{error}</p> : null}
    </div>
  );
};
