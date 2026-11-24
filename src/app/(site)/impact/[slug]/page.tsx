import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AnimalPic, StatusChip } from '@/components/AnimalPic';
import { getAnimals, getStories, getStory } from '@/lib/data';

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = await getStory((await params).slug);
  return s ? { title: `${s.name}'s story`, description: s.summary } : {};
}

export default async function StoryPage({ params }: Params) {
  const s = await getStory((await params).slug);
  if (!s) notFound();
  const animal = (await getAnimals()).find((a) => a.name === s.name);
  const others = (await getStories()).filter((x) => x.slug !== s.slug);

  return (
    <>
      <div className="section tight">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link> / <Link href="/impact">Our impact</Link> / {s.name}
          </p>
          <div className="profile">
            <div className="pic">
              <AnimalPic animal={animal ?? { name: s.name, c: s.c }} />
            </div>
            <div className="info">
              <div className="journey">
                {s.journey.map((j, n) => (
                  <span key={j} style={{ display: 'contents' }}>
                    {n > 0 && <em>›</em>}
                    <StatusChip status={j} inline />
                  </span>
                ))}
              </div>
              <h1>{`${s.name}'s story`}</h1>
              <p className="lede">{s.summary}</p>
              <p className="muted">{s.body}</p>
              <div className="modal-actions">
                {animal && <Link className="btn btn-dark" href={`/adopt/${animal.slug}`}>{`Meet ${animal.name}`}</Link>}
                <Link className="btn btn-yellow" href="/donate">Help the next rescue</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-sand tight">
        <div className="wrap">
          <div className="sec-head"><div><h2>More rescue stories</h2></div></div>
          <div className="cards2">
            {others.map((o) => (
              <Link key={o.slug} href={`/impact/${o.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{`${o.name}'s story`}</h3>
                <p>{o.summary}</p>
                <span className="link" style={{ alignSelf: 'start' }}>Read the story</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
