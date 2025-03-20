import { serial, text, integer, timestamp, pgSchema } from 'drizzle-orm/pg-core';

export const app = pgSchema('app');

export const user = app.table('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = app.table('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const logs = app.table('logs',  {
	id: serial('id').primaryKey(),
  tableName: text('table_name').notNull(),
  dbUser: text('db_user').notNull(),
  insertedAt: timestamp('inserted_at').defaultNow(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
