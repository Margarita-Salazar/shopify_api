exports.up = async function (knex) {
    await knex.schema
        .createTable("users", (table) => {
            table.increments("user_id");
            table.string("username", 250).notNullable().unique();
            table.string("email", 250).notNullable();
            table.string("password", 250).notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        })
        .createTable("images", (table) => {
            table.increments("image_id");
            table.binary("image_url").notNullable();
            table.string("image_title", 250).notNullable();
            table.integer("owner_id")
                .unsigned()
                .references("user_id")
                .inTable("users")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        });

};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("images").dropTableIfExists("users");
};
