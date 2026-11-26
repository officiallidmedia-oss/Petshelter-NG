import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="section">
      <div className="wrap narrow center copy">
        <h1>We can&apos;t find that page</h1>
        <p className="lede">The link may be old, or the animal has found a home. Try browsing the animals waiting for one.</p>
        <Link className="btn btn-dark" href="/adopt">Meet the animals</Link>
      </div>
    </div>
  );
}
