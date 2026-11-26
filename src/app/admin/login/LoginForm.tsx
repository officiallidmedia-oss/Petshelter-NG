'use client';

import { useActionState, useState } from 'react';
import { SITE } from '@/lib/config';
import { login, type LoginState } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [show, setShow] = useState(false);
  return (
    <form action={action} className="login-form">
      {state.error && <p className="login-err" role="alert">{state.error}</p>}
      <div className="field">
        <label htmlFor="username">Username<span className="req" aria-hidden="true">*</span></label>
        <input id="username" name="username" placeholder="Enter username" required autoComplete="username" autoCapitalize="none" autoFocus />
      </div>
      <div className="field">
        <label htmlFor="password">Password<span className="req" aria-hidden="true">*</span></label>
        <div className="pw">
          <input id="password" name="password" type={show ? 'text' : 'password'} placeholder="Enter password" required autoComplete="current-password" />
          <button type="button" className="pw-toggle" aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show} onClick={() => setShow((s) => !s)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
              {show && <path d="M3 3l18 18" />}
            </svg>
          </button>
        </div>
      </div>
      <div className="login-forgot-row">
        <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Staff password reset')}`}>Forgot password?</a>
      </div>
      <button className="btn btn-brand btn-block" type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Login'}
      </button>
    </form>
  );
}
