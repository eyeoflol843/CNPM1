const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const accessToken = req.headers.authorization;
        jwt.verify(accessToken.split(' ')[1], 'secret', function(error, decoded) {
            if (error) {
                req.user = undefined;
                next();
            }
            req.user = decoded;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
}


module.exports = {
    verifyToken,
}