require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

class BaseController{
    verifyJWT(req, resp, next) {
        const token = req.headers['x-access-token'];
        
        if(!token) {
            return resp.status(401).json({ auth: false, message: 'No token provided.' });
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                return resp.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }

            req.userId = decoded.id;
            next();
        });
    }
}

module.exports = new BaseController();