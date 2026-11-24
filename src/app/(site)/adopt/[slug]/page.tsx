import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AnimalCard } from '@/components/AnimalGrid';
import { AnimalPic, StatusChip } from '@/components/AnimalPic';
import { getAnimal, getAnimals, getAvailable } from '@/lib/data';
import { goodLabel } from '@/lib/content';

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getAnimals()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const a = await getAnimal((await params).slug);
  return a ? { title: `Meet ${a.name}`, description: a.story } : {};
}

function Health({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div>
      <i className={ok ? 'y' : 'n'}>{ok ? '✓' : '–'}</i>
      {label}
    </div>
  );
}

export default async function AnimalPage({ params }: Params) {
  const a = await getAnimal((await params).slug);
  if (!a) notFound();

  const more = (await getAvailable()).filter((x) => x.id !== a.id).slice(0, 4);

  return (
    <>
      <div className="section tight">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Home</Link> / <Link href="/adopt">Adopt a pet</Link> / {a.name}
          </p>
          <div className="profile">
            <div className="pic">
              <AnimalPic animal={a} />
              <StatusChip status={a.status} />
            </div>
            <div className="info">
              <p className="idline">{a.id}</p>
              <h1>{a.name}</h1>
              <p className="muted">{a.breed}</p>
              <div className="facts">
                <div><small>Species</small><b>{a.species}</b></div>
                <div><small>Sex</small><b>{a.sex}</b></div>
                <div><small>Age</small><b>{a.age}</b></div>
                <div><small>Size</small><b>{a.size}</b></div>
              </div>
              <p className="lede">{a.story}</p>
              <h4 style={{ marginTop: 6 }}>Health record</h4>
              <div className="med">
                <Health ok={a.vax} label="Vaccinated" />
                <Health ok={a.ster} label="Sterilised" />
                <Health ok={a.dew} label="Dewormed" />
                <Health ok={a.chip} label="Microchipped" />
              </div>
              <div className="chips">
                {a.good.map((g) => (
                  <span className="chip" key={g}>{goodLabel(g)}</span>
                ))}
              </div>
              <div className="modal-actions">
                {a.status === 'adopted' ? (
                  <Link className="btn btn-dark" href="/adopt">Meet other animals</Link>
                ) : (
                  <>
                    {a.status === 'available' ? (
                      <Link className="btn btn-dark" href={`/adopt?animal=${a.slug}#apply`}>{`Apply to adopt ${a.name}`}</Link>
                    ) : (
                      <Link className="btn btn-dark" href="/foster">Ask about fostering</Link>
                    )}
                    <Link className="btn btn-yellow" href="/donate?for=A%20specific%20animal#donate-box">{`Sponsor ${a.name}`}</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section bg-sand">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2>More animals waiting for a home</h2>
            </div>
            <Link className="btn btn-line btn-sm" href="/adopt">See all animals</Link>
          </div>
          <div className="grid-animals">
            {more.map((m) => (
              <AnimalCard key={m.id} animal={m} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
