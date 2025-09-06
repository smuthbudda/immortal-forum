import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg'; // <-- Add this
import { dude } from '../../db/schema.js';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types.js';
import bcrypt from 'bcrypt';

// ✅ Set up a proper PG pool
const pool = new Pool({
  connectionString: 'postgres://postgres:ABC.123@localhost:5432/immortal_db'
});

console.log('Database URL:', pool);
const db = drizzle(pool); // ✅ Correct way to create Drizzle instance

export const actions: Actions = {
  saveuser: async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!username || !email || !password) {
      return fail(400, {
        error: 'Username, email, and password are required',
        username: username?.toString() || '',
        email: email?.toString() || '',
        password: password?.toString() || ''
      });
    }

    const emailStr = email.toString();
    const usernameStr = username.toString();
    const passwordStr = password.toString();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
      return fail(400, {
        error: 'Please enter a valid email address',
        username: usernameStr,
        email: emailStr
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(passwordStr, 10);

      await db.insert(dude).values({
        id: 1,
        username: usernameStr,
        email: emailStr,
        password_hash: hashedPassword
      });

      return {
        success: true,
        message: 'User created successfully!'
      };
    } catch (error) {
      console.error('Database error:', error);
      return fail(500, {
        error: 'Failed to create user. Please try again.',
        username: usernameStr,
        email: emailStr,
        password: passwordStr
      });
    }
  }
};
