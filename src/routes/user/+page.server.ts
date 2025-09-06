import { drizzle } from 'drizzle-orm/node-postgres';
import { dude } from '../../db/schema.js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';

const db = drizzle(process.env.DATABASE_URL!);

export const actions: Actions = {
  saveuser: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');

    // Validate form data
    if (!username || !email) {
      return fail(400, { 
        error: 'Username and email are required',
        username: username?.toString() || '',
        email: email?.toString() || ''
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.toString())) {
      return fail(400, { 
        error: 'Please enter a valid email address',
        username: username.toString(),
        email: email.toString()
      });
    }

    try {
      // Insert new user into database
      await db.insert(dude).values({ 
        username: username.toString(), 
        email: email.toString() 
      });

      return { 
        success: true, 
        message: 'User created successfully!' 
      };
    } catch (error) {
      console.error('Database error:', error);
      return fail(500, { 
        error: 'Failed to create user. Please try again.',
        username: username.toString(),
        email: email.toString()
      });
    }
  }
};