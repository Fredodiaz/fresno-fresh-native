const jwt = require('jsonwebtoken')
const keys = require('../config/keys').secretOrKey;

// Verifies Authorization Token
const authenticateJWT = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = authorization.split(' ')[1];

        jwt.verify(token, keys, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;