import type { Metadata, Viewport } from 'next';
import { Lilita_One, Nunito, Poppins } from 'next/font/google';
import SvgDefs from '@/components/SvgDefs';
import ToastProvider from '@/components/Toast';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-poppins', display: 'swap' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
const lilita = Lilita_One({ subsets: ['latin'], weight: '400', variable: '--font-lilita', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Pet Shelter NG – Rescue, rehabilitate, rehome | Abuja',
    template: 'Pet Shelter NG – %s',
  },
  description:
    'Pet Shelter NG rescues, rehabilitates and rehomes abandoned and vulnerable animals in Abuja. Adopt, foster, donate or volunteer.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable} ${lilita.variable}`}>
      <body>
        <SvgDefs />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
