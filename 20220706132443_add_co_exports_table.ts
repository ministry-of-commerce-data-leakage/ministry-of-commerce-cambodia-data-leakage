import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('co_exports'))) {
    return await knex.schema.createTable('co_exports', (table) => {
      table.increments();
      table.string('name');
      table.integer('website_id');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('co_exports');
}
