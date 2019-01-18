const { MongoClient } = require('mongodb');
const { dbURI } = require('../config');

let mongoClient;

async function connect() {
    mongoClient = await MongoClient.connect(dbURI, { useNewUrlParser: true }); //useNewUrlParser: true -> egy warrning szöveg eltüntetése miatt van ott. :) 
}

function getDB() {
    return mongoClient.db(mongoClient.s.options.db); // Visszanyerjük az adatbázis nevét az adatbázis objektumból
}


module.exports = {
    connect,
    getDB,
};