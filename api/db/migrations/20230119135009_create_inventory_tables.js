/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("inventory_ledger", (table) => {
        table.increments('id');
        table.string("first_name", 50);
        table.string("last_name", 50);
        table.string("directorate", 25);
        table.string("position", 50);
        table.string("laptop_sn", 25);
        table.string("laptop_name", 50);
        table.integer("aruba_name");
        table.integer("cert_exp");
        table.text('hand_receipt');
        table.string("router_sn", 25);
        table.boolean("boi")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("inventory_ledger");
};
