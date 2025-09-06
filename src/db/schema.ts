import { integer, pgTable, varchar, timestamp, text} from "drizzle-orm/pg-core";

// The 'dude' table represents a user in the system.
export const dude = pgTable('dude', {
  id: integer('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  password_hash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  externalId: varchar('external_id', { length: 255 }),
});

// The 'dudeReputation' table stores reputation points for each user.
export const dudeReputation = pgTable('dude_reputation', {
  id: integer('id').primaryKey(),
  dudeId: integer('dude_id')
    .references(() => dude.id)
    .notNull(),
  reputationPoints: integer('reputation_points').default(0).notNull(),
});

// The 'topic' table defines different topics for forum posts.
export const topic = pgTable('topic', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }),
});

// The 'forum' table holds the main forum posts.
export const forum = pgTable('forum', {
  id: integer('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  dudeId: integer('dude_id')
    .references(() => dude.id)
    .notNull(),
  topicId: integer('topic_id')
    .references(() => topic.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});