const Images = require('./model');

function idChecker(req, res, next) {
    Images.getById(req.params.id)
        .then(image => {
            if (image) {
                req.image = image;
                next();
            } else {
                next({ status: 404, message: 'Image not found' });
            }

        })
        .catch(next);
}


async function checkOwner(req, res, next) {
    const image_id = req.params.id;
    Images.getById(image_id)
        .then((image) => {
            if (image.owner_id === req.decodeJwt.subject) {
                next();
            } else {
                next({ status: 403, message: 'You are not the owner of this image.' });
            }
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    idChecker,
    checkOwner,
};