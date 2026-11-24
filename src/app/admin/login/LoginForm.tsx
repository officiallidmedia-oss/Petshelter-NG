'use client';

import { useActionState } from 'react';
import { login, type LoginState } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} style={{ display: 'grid', gap: 16 }}>
      {state.error && <p className="login-err" role="alert">{state.error}</p>}
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" autoFocus />
      </div>
      <button className="btn btn-dark btn-block" type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
