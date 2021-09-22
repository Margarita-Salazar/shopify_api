const db = require("../../data/dbconfig");

function find() {
    return db("users")
        .select(
            "user_id",
            "username",
            "email");
}

function findBy(filter) {
    return db("users")
        .where(filter);
}

function findById(user_id) {
    return db("users")
        .select(
            "username",
            "email")
        .where("user_id", user_id)
        .first();
}

async function add(user) {
    return db("users")
        .insert(user, ["username", "email"]);
}

module.exports = {
    add,
    find,
    findBy,
    findById,
};