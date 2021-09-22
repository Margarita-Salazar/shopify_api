const router = require("express").Router();

const Users = require("../users/model");

const {
    checkPayload,
    checkUsername,
    checkCredentials,
} = require("./auth_middleware");

router.post("/register", checkPayload, checkUsername, (req, res, next) => {
    req.body.password = req.hash;

    Users.add(req.body)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch(next);
});

router.post("/login", checkCredentials, (req, res) => {
    const { username } = req.body;

    res.status(200).json({
        message: `welcome, ${username}`,
        token: req.token,
    });
});

module.exports = router;
