const jwt = require('jsonwebtoken');
const users = require('../../db/user');
const { jwtSecret } = require('../../config');

async function jwtAuth (req,res,next) {
    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).send({ message: 'Unauthorized, no data'});
    }

    // Bearer asdsadsadsadasdas
    const [scheme, token] = auth.split(' ');

    if(scheme !== 'Bearer' || !token) {
        return res.status(401).send({ message: 'Unauthorized, invalid token'});
    }

    try{
        const data = jwt.verify(token,jwtSecret);
    } catch(err) {
        console.log('Hiba!!');
    }

    // { name, email}

    return next();
}

module.exports = jwtAuth;