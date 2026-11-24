import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { WaFloat } from '@/components/WaButton';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="preview-strip">
        <b>Design preview.</b> Animals, figures, stories and team shown are samples, to be replaced with Pet Shelter NG&apos;s own.
      </div>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <WaFloat />
    </>
  );
}
