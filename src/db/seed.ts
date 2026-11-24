import { config } from 'dotenv';
config({ path: '.env.local' });

async function main() {
  const { db, schema } = await import('./index');
  const { ANIMALS, STORIES } = await import('./seed-data');

  await db.insert(schema.animals).values(ANIMALS).onConflictDoNothing();
  await db.insert(schema.stories).values(STORIES).onConflictDoNothing();
  console.log(`Seeded ${ANIMALS.length} animals and ${STORIES.length} stories.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
