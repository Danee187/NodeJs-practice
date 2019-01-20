const { ObjectId } = require('mongodb');
const { getDB } = require('./index.js');

const colletctionName = 'users';

async function register(userData) {
    await getDB().collection(colletctionName).insertOne(userData);

    return userData;  // Azért küldjük vissza a datat, mert amikor sikeres a küldés nem a mongodb sikeresen elküldte üzenetét kapjuk meg, hanem az elküldött 'data'-t
}

async function findByEmail(email) {
    return await getDB().collection(colletctionName).findOne({email});
}

module.exports = {
    register,
    findByEmail,
}