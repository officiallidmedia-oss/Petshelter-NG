import AnimalEditor from '@/components/admin/AnimalEditor';
import { PageHead } from '@/components/admin/ui';

export const metadata = { title: 'Add an animal' };

export default function NewAnimal() {
  return (
    <>
      <PageHead title="Add an animal" sub="Create a profile with a photo. It goes live on the website as soon as you save." />
      <AnimalEditor />
    </>
  );
}
