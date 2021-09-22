const db = require('../../data/dbconfig');

function add(imageData) {
    return db("images").insert(imageData, ["image_title"]);
}


function remove(id) {
    return db("images").where("image_id", id).del();
}

function getById(id) {
    return db('i as i')
        .select(
            'i.*',
            'u.username as owner'
        )
        .join(
            'users as u',
            'i.owner_id', 'u.user_id'
        )
        .where('image_id', id)
        .first();
}

module.exports = {
    add,
    remove,
    getById
};