import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table('users', (field) => {
    field.string('user_profile');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users');
}
