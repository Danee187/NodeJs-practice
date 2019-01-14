/* console.log("Hello Wolrd"); */

/* function greeting(greet) {
    console.log(greet);
}

greeting("Yo man!!!"); */

const http = require('http');
const fs = require('fs');

fs.readFile('index.html', (err,html)=> {
    if(err){
        throw err;
    }

    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req,res)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','text/html'); 
        //text->plain:sima stringet dob vissza / text/html : html tipusu adatot dob vissza
        res.write(html);
        res.end();
    });

    server.listen(port, hostname, () => {
        console.log("Server started on port"+port+" !!!");
    });

});

