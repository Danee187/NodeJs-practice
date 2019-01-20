const users = require('../db/user');

async function register(req,res) {
    const user = await users.register(req.body);

    res.send(user);
}

async function login(req,res) {

    const { email, pass} = req.body;
    const sessionToken = Buffer.from(`${email}:${password}`).toString('base64');
    res.cookie('session','sessionToken',{maxAge: 9000, httpOnly: true}).end(); // httpOnly: true -> http-n működik csak , secure:true -> https-en működik csak

}

module.exports= { 
    register, login,
}