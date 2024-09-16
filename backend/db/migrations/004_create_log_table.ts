import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('model').notNullable();
    table.string('stop_reason');
    table.integer('input_tokens').notNullable();
    table.integer('output_tokens').notNullable();
    table.text('input');
    table.text('output');
    table.string('error');
    table
      .uuid('organization_id')
      .references('id')
      .inTable('organizations')
      .onDelete('CASCADE')
      .notNullable();
    table.specificType('tags', 'text[]');
    table.string('user');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('logs');
}
