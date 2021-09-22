exports.seed = async (knex) => {
    await knex("users").del();
    return knex("users").insert([
        {
            username: "rowValue1",
            email: "username1@email.com",
            password: "1234",
        },
        {
            username: "rowValue2",
            email: "username1@email.com",
            password: "1234",
        },
        {
            username: "rowValue3",
            email: "username1@email.com",
            password: "1234",
        },
    ]);
};
