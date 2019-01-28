const jwt = require('jsonwebtoken');
const users = require('../db/user');
const { jwtSecret } = require('../config');

async function register(req,res) {
    const user = await users.register(req.body);

    res.send(user);
}

async function login(req,res) {

    const { email, password } = req.body;
    // validálni kell a usert!!!
    const sessionToken = Buffer.from(`${email}:${password}`).toString('base64');
    res.cookie('session',sessionToken,{maxAge: 900000}).end(); // httpOnly: true -> http-n működik csak , secure:true -> https-en működik csak
    // user elküldése
}


async function loginJWT(req,res) {

    const { email, password } = req.body;
    // validálni kell a usert!!!

    const token = jwt.sign({email}, jwtSecret); // Jwt token generálás
    // user elküldése
    res.send({ token }); // { token } = { token:token } 

}


async function loginJWTCookie(req,res) {

    const { email, password } = req.body;
    // validálni kell a usert!!!

    const token = jwt.sign({email}, jwtSecret); // Jwt token generálás
    // user elküldése
    res.cookie('token', token, { maxAge: 90000000, httpOnly: true }).end(); // { token } = { token:token } 

}

module.exports= { 
    register, 
    login: loginJWTCookie,
}