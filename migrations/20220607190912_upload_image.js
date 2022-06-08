exports.up = function (knex) {
  return knex.schema.createTable("gallery", (table) => {
    table.increments().primary();
    table.string("image_url", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("gallery");
};
