'use client';

import type { ButtonHTMLAttributes } from 'react';
import { SITE } from '@/lib/config';
import { useToast } from './Toast';

/** Opens WhatsApp once NEXT_PUBLIC_WHATSAPP is set; shows a notice until then. */
export function useWhatsApp() {
  const toast = useToast();
  return () => {
    if (!SITE.whatsapp) {
      toast("WhatsApp chat will open here once Pet Shelter NG's number is added.");
      return;
    }
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Pet Shelter NG, ')}`, '_blank', 'noopener');
  };
}

export default function WaButton({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const open = useWhatsApp();
  return (
    <button type="button" {...rest} onClick={open}>
      {children}
    </button>
  );
}

export function WaFloat() {
  const open = useWhatsApp();
  return (
    <button className="wa-float" onClick={open} aria-label="Chat with Pet Shelter NG on WhatsApp">
      <svg viewBox="0 0 24 24">
        <use href="#wa" />
      </svg>
    </button>
  );
}
