const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const router = require('./router.js');
const { port } = require('./config.js');

const app = express();

app.use(cors()); // Meglehet monddani neki, hogy milyen http methódusokkal érhető el a szerver.
app.use(bodyparser.json());
app.use(helmet());

// Logger - ki írja mikor milyen kérés érkezett be a szerverre
app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url} at ${new Date()}`);
    next();
}); 

app.use(router);
// Fontos a sorrend az app.use esetében


// Error kezelés
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(500);
    return res.end({
        message: "Hiba történt",
    });
});

app.listen(port, (err) => {

    if(err) {
        console.err(err);
        process.exit(1);
    }

    console.log(`Az alkalmazás a következő URL-en érhető el: http://loclahost:${port}`);
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