const http = require("http");
const {parse: URLParse} = require('url');
const {parse: queryParse} = require('querystring'); // Ezzel tudjuk a query stringeket parsolni (amik az urlben a ? jel után vannak)

const DEFAULT_PORT = 3000;
let port = DEFAULT_PORT;
const args = process.argv.slice(2);
/* console.log(args); */

if(args[0]) {
    port = parseInt(args[0], 10);
}

const handler = (req, res) => {
   // console.log(req.url); // beérkezett url lekérése
    const reqURL = URLParse(req.url); // Ezzel csak a routing adatokat szedi ki az URL-ből. A plusz infokat nem. 
    
    switch(reqURL.pathname) {
        case '/hello': {
            //Ha 'hello' útra akarunk menni akkor ez fut le
            let response = "Most a 'hello'-n vagy !!!"

            const query = queryParse(reqURL.query);
            if(query.nev) {
                response +=` Szia ${query.nev.charAt(0).toUpperCase() + query.nev.slice(1)}`;
            }

            res.end(`${response}!`);
            
            break;
        }
        
        default: {
            res.writeHead(404); //nem talált semmit - server code
            res.end('Not found');
        }
    }
    
    
    console.log(reqURL.pathname);
    res.end("Hello");
}

const server = http.createServer(handler);

server.listen(port);

server.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

