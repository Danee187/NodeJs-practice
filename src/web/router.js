const { Router } = require('express');
const getCurrency = require('../currency');
const { get, list, insert, update, remove } = require('./expenseHandler');
const { register, login } = require('./userHandler');
const auth = require('./auth/cookies');  // auth -> simple, basic

const router = Router();

router.get('/', (req, res) => {
    res.send({
        message: "Ok",
    });
});

router.get('/currency', async (req,res) => {
    const result = await getCurrency();

    res.send({
        message: "ok", 
        value: result.value
    });
});

//Expense related endpoints
router.get('/expenses', auth, list);
router.get('/expenses/:id', get);
router.post('/expenses', insert);
router.put('/expenses/:id', update);
router.delete('/expenses/:id', remove);

//User related endpoints
router.post('/register', register);
router.post('/login', login);


module.exports = router;







// OLD
/* router.get('/hello',(req, res) => {
    res.send('Szia');
});

router.post('/hello', (req, res) => {
    const { nev } = req.body;

    console.log(req.body);
    res.send(`Szia ${nev}`);
});

router.get('/hiba', (req, res) => {
    throw Error("Nem sikerült végrehajtani.")
});

module.exports = router;
 */
