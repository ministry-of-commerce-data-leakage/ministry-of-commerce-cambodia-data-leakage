import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('stat_countries'))) {
    return await knex.schema.createTable('stat_countries', (table) => {
      table.increments();
      table.double('class');
      table.string('code');
      table.string('country_name');
      table.string('country_name_kh');
      table.integer('website_id');
      table.string('country_image');
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('stat_countries');
}
