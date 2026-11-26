import { config } from 'dotenv';
config({ path: '.env.local' });

/** Creates (or resets the password of) the admin account. Usage: npm run db:seed-admin */
async function main() {
  const bcrypt = (await import('bcryptjs')).default;
  const { db, schema } = await import('./index');
  const username = process.env.SEED_ADMIN_USERNAME ?? 'ADMIN';
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!password) throw new Error('Set SEED_ADMIN_PASSWORD for this command (it is not stored anywhere).');
  const passwordHash = await bcrypt.hash(password, 12);
  await db
    .insert(schema.adminUsers)
    .values({ username, passwordHash, role: 'admin' })
    .onConflictDoUpdate({ target: schema.adminUsers.username, set: { passwordHash } });
  console.log(`Admin account "${username}" is ready (bcrypt, cost 12).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
