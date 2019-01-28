const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const http = require('http');
const router = require('./router.js');
const { port } = require('../config.js');
const logger = require('../logger');
const { promisify } = require('util'); // Callback-es függvényeket promise-ra állítja át

const app = express();
const server = http.createServer(app);

app.use(cors()); // Meglehet monddani neki, hogy milyen http methódusokkal érhető el a szerver.
app.use(cookieParser());
app.use(bodyparser.json());
app.use(helmet());

// Logger - ki írja mikor milyen kérés érkezett be a szerverre
app.use((req, res, next) => {
   // console.log(`${req.method}, ${req.url} at ${new Date()}`); --> ez helyett is winstont használunk
   logger.debug(`${req.method}, ${req.url} at ${new Date()}`);
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


const listenPromise = promisify(server.listen.bind(server, port));

module.exports = {
    init: listenPromise,
};

// OLD 
/* app.listen(port, (err) => {

    if(err) {
        logger.err(err);
        process.exit(1);
    }

    logger.info(`Az alkalmazás a következő URL-en érhető el: http://loclahost:${port}`);
});
 */

/* 
GET / cars  --> kilistázni a kocsikat
GET / cars:id --> kilistázni egy kocsit
POST / cars  --> Hozzáadni egy kocsit a kocsikhoz   
PUT - PATCH / cars/:id --> Frissíteni egy kocsit
DEL / cars/:id --> törlünk egy kocsit
 */


 // MONGODB USER --> userdb : password123 


// CORS ->  Cross original resource saharing : kliens és a szerver közötti komunikációt tudjuk limitálni 
// Body-parser -> json cuccosokat lehessen parsolni
// Nodemon -> Dev eszköz. Nem kell mindig újra indítani a szervert. Hanem amikor változás történik a megadott filenál (index.js) akkor automatikusan újra indítja. 