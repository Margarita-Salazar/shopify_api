const Users = require("../users/model");

const bcrypt = require("bcryptjs");

const tokenBuilder = require("./token_builder");

const { ROUNDS } = require("../../config");

async function checkPayload(req, res, next) {
    const { username, password, email } = req.body;

    if (
        !username ||
        !username.trim() ||
        !password ||
        !password.trim() ||
        !email ||
        !email.trim()
    ) {
        next({
            status: 400,
            message: "username, email, and password required",
        });
    } else {
        next();
    }
}

function checkUsername(req, res, next) {
    const { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            if (user) {
                next({
                    status: 409,
                    message: "username taken",
                });
            } else {
                req.hash = bcrypt.hashSync(password, Number(ROUNDS));
                next();
            }
        })
        .catch(next);
}

function checkCredentials(req, res, next) {
    const { username, password } = req.body;

    if (!username || !username.trim() || !password || !password.trim()) {
        next({
            status: 400,
            message: "username, and password required",
        });
    } else {
        Users.findBy({ username })
            .then(([user]) => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    req.token = tokenBuilder(user);
                    next();
                } else {
                    next({
                        status: 401,
                        message: "Invalid credentials",
                    });
                }
            })
            .catch(next);
    }
}

module.exports = {
    checkPayload,
    checkUsername,
    checkCredentials,
};
