import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { dude } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    // Seed data
    
}

main();