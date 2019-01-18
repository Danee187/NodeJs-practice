const { getDB } = require('./index.js');

async function list() {
    const result = await getDB().collection('expenses').find().toArray();

    return result;
}

module.exports = {
    list,
}