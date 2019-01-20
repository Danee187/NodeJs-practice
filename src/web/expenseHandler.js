const joi = require('joi');
const expenses = require('../db/expense');
const logger = require('../logger');

const expenseSchema = joi.object({
    title: joi.string().required(),
    amount: joi.number().min(1).required(),
}).unknown().required();


async function get(req, res) {
    const expenseID = req.params.id;

    const result = await expenses.get(expenseID);

    if(!result){
        res.status(404);
        res.end();
    }
    
    res.send(result);
}

async function list(req, res) {
    const result = await expenses.list();

    res.send(result);
}

async function insert(req, res) {
    
    //logger.info(JSON.stringify(req.body));  // logger nehezen kezeli a json fileokat, ezért át kell alakítani őket.

    try{
        joi.attempt(req.body, expenseSchema);
    }
    catch(err) {
        res.status(400);
        res.send(err.details[0].message); // ezt a hiba üzenetet a joi fogja dobni 
    }

    const result = await expenses.insert(req.body);

    res.status(201); //Created status
    res.send(result);
}

async function update(req, res) {
        
        //logger.info(JSON.stringify(req.body));  // logger nehezen kezeli a json fileokat, ezért át kell alakítani őket.
        //Hasonló a felépítése az Update-nek, m int az insert-nek. Csak itt elküldjük a módosítandó elem ID-ját is.

        try{
            joi.attempt(req.body, expenseSchema);
        }
        catch(err) {
            res.status(400);
            res.send(err.details[0].message); // ezt a hiba üzenetet a joi fogja dobni 
        }
    
        const expenseID = req.params.id;

        const result = await expenses.update(expenseID, req.body);
    
        res.send(result);
}

async function remove(req, res) {
    
    const expenseID = req.params.id;

    await expenses.remove(expenseID); 

    res.status(204); // No content
    res.end();
}

module.exports = {
    get, list, insert, update, remove,
}