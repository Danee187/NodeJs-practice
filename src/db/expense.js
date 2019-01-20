const { ObjectId } = require('mongodb');
const { getDB } = require('./index.js');

const colletctionName = 'expenses';

async function list() {
    const result = await getDB().collection(colletctionName).find().toArray();
    // további szűrési opciók a .find() után: .skip().limit().sort() ...

    return result;
}

async function get(id) {
    const result = await getDB().collection(colletctionName).findOne({ _id : ObjectId(id) });

    return result;
}

async function insert(data) {
    await getDB().collection(colletctionName).insertOne(data);

    return data;  // Azért küldjük vissza a datat, mert amikor sikeres a küldés nem a mongodb sikeresen elküldte üzenetét kapjuk meg, hanem az elküldött 'data'-t
}

async function update(id, data) {
    await getDB().collection(colletctionName).updateOne({  _id : ObjectId(id)},  {$set: data}); // $set mondja meg, hogyan updatelje. data tartalma pl: {amount : 5000}

    return data;  // Azért küldjük vissza a datat, mert amikor sikeres a küldés nem a mongodb sikeresen elküldte üzenetét kapjuk meg, hanem az elküldött 'data'-t
}

async function remove(id) {
    await getDB().collection(colletctionName).deleteOne({  _id : ObjectId(id)}); // $set mondja meg, hogyan updatelje. data tartalma pl: {amount : 5000}

}


module.exports = {
    list, get, insert, update, remove,
}