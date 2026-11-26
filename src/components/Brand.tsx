/**
 * The one Pet Shelter NG lockup: house mark + "PET SHELTER" wordmark + "NG" tag.
 * Used in the header, mobile menu, footer and admin so the brand reads the same everywhere.
 * `tone="light"` is for dark backgrounds.
 */
export default function Brand({ tone = 'dark', compact = false }: { tone?: 'dark' | 'light'; compact?: boolean }) {
  return (
    <span className={`brandmark${tone === 'light' ? ' light' : ''}${compact ? ' compact' : ''}`}>
      <svg viewBox="0 0 1095 850" aria-hidden="true">
        <use href="#mark" fill="currentColor" />
      </svg>
      <span className="wm">
        <b>PET SHELTER</b>
        <i>NG</i>
      </span>
    </span>
  );
}
