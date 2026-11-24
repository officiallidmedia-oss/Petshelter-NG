import Image from 'next/image';
import type { CSSProperties } from 'react';
import { IMAGES } from '@/lib/images';

type Props = {
  k: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
};

/** Site photo by key (see lib/images.ts). Sets width/height so the layout never jumps. */
export default function Photo({ k, alt, className, style, priority, sizes }: Props) {
  const m = IMAGES[k];
  if (!m) return null;
  return (
    <Image
      src={m.src}
      width={m.w}
      height={m.h}
      alt={alt}
      className={className}
      style={style}
      priority={priority}
      sizes={sizes ?? '(max-width: 900px) 100vw, 50vw'}
    />
  );
}
