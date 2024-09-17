import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('logs', (table) => {
    table.string('api_key_id').nullable();
    table.foreign('api_key_id').references('id').inTable('api_keys');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('logs', (table) => {
    table.dropColumn('api_key_id');
  });
}