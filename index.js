const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require('./config.js');
const router = require('./router.js');

const app = express();

app.use(cors()); // Meglehet monddani neki, hogy milyen http methódusokkal érhető el a szerver.

app.use(bodyparser.json());

app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url} at ${new Date()}`);
    next();
}); 

app.use(router);


// Fontos a sorrend az app.use esetében
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500);
    return res.end('Ismeretlen hiba történt az alkalmazásban');
});

app.listen(config.port, () => {
    console.log(`alkalmazás fut a portopn: ${config.port} `);
});


/* 
GET / cars  --> kilistázni a kocsikat
GET / cars:id --> kilistázni egy kocsit
POST / cars  --> Hozzáadni egy kocsit a kocsikhoz   
PUT - PATCH / cars/:id --> Frissíteni egy kocsit
DEL / cars/:id --> törlünk egy kocsit
 */


// CORS ->  Cross original resource saharing : kliens és a szerver közötti komunikációt tudjuk limitálni 
// Body-parser -> json cuccosokat lehessen parsolni
// Nodemon -> Dev eszköz. Nem kell mindig újra indítani a szervert. Hanem amikor változás történik a megadott filenál (index.js) akkor automatikusan újra indítja. 