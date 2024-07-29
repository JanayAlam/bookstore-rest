import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("books", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary().notNullable().unique();
    table.string("title").notNullable();
    table.text("description").nullable();
    table.date("published_date").notNullable();
    table.integer("author_id").unsigned();
    table
      .foreign("author_id")
      .references("authors.id")
      .deferrable("deferred")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("books");
}
