import { drizzle } from 'drizzle-orm/node-postgres';
import { dude } from '../../db/schema.js';
const db = drizzle(process.env.DATABASE_URL!);

export const load = async ({ params }) => {
    // Fetch data from an API, database, or read a file
    const response = await fetch(`https://api.example.com/data/${params.slug}`);
    const data = await response.json();

    // Return an object containing the data
    return {
        data: data
    };
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');

    // Process the form data (e.g., save to a database)
    console.log('Received form data:', { name, email });
    await db.insert(dude).values({ username: name as string, email: email as string });

    // Return data or a redirect
    return { success: true, message: 'Form submitted successfully!' };
  }
};