import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const seedFilePath = path.join(__dirname, 'data/seed.sql');
  const seedSQL = fs.readFileSync(seedFilePath, 'utf-8');

  const commands = seedSQL
    .split(';')
    .map((cmd) => cmd.trim())
    .filter((cmd) => cmd.length > 0);

  for (const command of commands) {
    await prisma.$executeRawUnsafe(command);
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
