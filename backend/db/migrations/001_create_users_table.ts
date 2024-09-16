import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().notNullable();
    table.string('password');
    table.date('last_access');
    table.boolean('is_public').defaultTo(false);
    table.timestamps(true, true);

    table.uuid('active_org').nullable();
    table.foreign('active_org').references('organizations.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
