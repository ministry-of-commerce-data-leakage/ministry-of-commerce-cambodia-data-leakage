import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('activity_logs'))) {
    return await knex.schema.createTable('activity_logs', (table) => {
      table.increments();
      table.string('type');
      table.json('activity');
      table.integer('user_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(): Promise<void> {}
