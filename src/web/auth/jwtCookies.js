const jwt = require('jsonwebtoken');
const users = require('../../db/user');
const { jwtSecret } = require('../../config');

async function jwtAuth (req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).send({ message: 'Unauthorized, no data'});
    }

    try{
        const data = jwt.verify(token, jwtSecret);
    } catch(err) {
        console.log('Hiba!!');
    }

    // data
    return next();
}

module.exports = jwtAuth;