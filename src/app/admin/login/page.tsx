import Brand from '@/components/Brand';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign in' };

const WAVES = [
  { d: 'M-140 40 C 120 -120, 300 300, 520 150 S 820 -30, 980 210', w: 150, c: '#8C4A00', o: 0.35 },
  { d: 'M-140 200 C 120 40, 300 460, 520 310 S 820 130, 980 370', w: 95, c: '#E2870A', o: 0.55 },
  { d: 'M-140 390 C 120 230, 300 650, 520 500 S 820 320, 980 560', w: 135, c: '#C86F00', o: 0.5 },
  { d: 'M-140 580 C 120 420, 300 840, 520 690 S 820 510, 980 750', w: 70, c: '#F2B01E', o: 0.25 },
  { d: 'M-140 760 C 120 600, 300 1020, 520 870 S 820 690, 980 930', w: 120, c: '#8C4A00', o: 0.4 },
  { d: 'M-140 940 C 120 780, 300 1200, 520 1050 S 820 870, 980 1110', w: 90, c: '#E2870A', o: 0.45 },
];

/** Two-panel sign-in: flowing brand pattern on the left, form card on the right. */
export default function LoginPage() {
  return (
    <div className="login">
      <div className="login-art" aria-hidden="true">
        <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
          {WAVES.map((wave) => (
            <path
              key={wave.d}
              d={wave.d}
              fill="none"
              stroke={wave.c}
              strokeWidth={wave.w}
              strokeLinecap="round"
              opacity={wave.o}
            />
          ))}
        </svg>
      </div>

      <div className="login-side">
        <div className="login-card">
          <Brand />
          <h1>Welcome Back</h1>
          <LoginForm />
        </div>
        <p className="login-foot">©{new Date().getFullYear()} Pet Shelter NG</p>
      </div>
    </div>
  );
}
