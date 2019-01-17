const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send({
        message: "Ok",
    });
});


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
