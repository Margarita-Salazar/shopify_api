const router = require("express").Router();

const Images = require("./model");

const { idChecker, checkOwner } = require("./middleware");

router.post("/", (req, res, next) => {
    if (req.body.length > 1) {
        req.body.forEach(image => {
            Images.add(req.body)
                .then((data) => {
                    res.status(201).json(data);
                })
                .catch(next);
        });
    } else {
        Images.add(req.body)
            .then((data) => {
                res.status(201).json(data);
            })
            .catch(next);
    }
});

router.delete('/:id', idChecker, checkOwner, (req, res, next) => {
    Potlucks.remove(req.params.id)
        .then(deleted => {
            res.json({ remove: deleted });
        })
        .catch(next);
});

module.exports = router;
