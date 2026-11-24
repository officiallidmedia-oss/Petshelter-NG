import Photo from '@/components/Photo';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <div className="login">
      <div className="login-card">
        <Photo k="logo" alt="Pet Shelter NG" sizes="84px" priority />
        <h1>Staff portal</h1>
        <LoginForm />
      </div>
    </div>
  );
}
