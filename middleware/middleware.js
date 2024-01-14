const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).jsend.fail({ message: 'Token is not valid' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).jsend.fail({ message: 'Authorization header not found' });
    }
}

module.exports = isAuth;
