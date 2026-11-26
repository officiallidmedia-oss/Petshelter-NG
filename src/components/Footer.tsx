import Link from 'next/link';
import { SITE } from '@/lib/config';
import Brand from './Brand';
import WaButton from './WaButton';

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="f-grid">
          <div>
            <Link className="f-brand" href="/" aria-label="Pet Shelter NG home">
              <Brand tone="light" />
            </Link>
            <p className="f-about">Rescuing, rehabilitating and rehoming abandoned and vulnerable animals in Abuja.</p>
            <div className="socials">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.6 14.7 3.6 12s0-3 .1-4.1c.1-2.7 1.4-4 4.1-4.1 1.1-.1 1.4-.2 4.2-.2zM12 2c-2.7 0-3.1 0-4.1.1C4.2 2.2 2.2 4.2 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.7 2.1 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.1 5.7-2.1 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1c-.1-3.7-2.1-5.7-5.8-5.8C15.1 2 14.7 2 12 2z" />
                </svg>
              </a>
              <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg viewBox="0 0 24 24">
                  <path d="M16.6 2h-3.3v13.3a2.9 2.9 0 1 1-2-2.8V9.2a6.2 6.2 0 1 0 5.3 6.1V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.5 4.5 0 0 1-4.4-4.7z" />
                </svg>
              </a>
              <WaButton aria-label="WhatsApp">
                <svg viewBox="0 0 24 24">
                  <use href="#wa" />
                </svg>
              </WaButton>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/adopt">Adopt a pet</Link></li>
              <li><Link href="/foster">Foster a pet</Link></li>
              <li><Link href="/impact">Our impact</Link></li>
              <li><Link href="/petfest">PetFest Abuja</Link></li>
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              <li><Link href="/donate">Donate</Link></li>
              <li><Link href="/get-involved">Volunteer</Link></li>
              <li><Link href="/get-involved#partner">Partner with us</Link></li>
              <li><Link href="/report">Report an animal</Link></li>
              <li><Link href="/admin">Staff login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>{SITE.address}</li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>@petfestabuja on Instagram and TikTok</li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <span>© {new Date().getFullYear()} Pet Shelter NG. All rights reserved.</span>
          <span>Website by LIDMedia</span>
        </div>
      </div>
    </footer>
  );
}
