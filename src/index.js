const { init } = require('./web/server');
const logger = require('./logger');
const { connect } = require('./db'); //Ha egy mappában van index file, akkor elég csak a mappa nevét megadni

async function startup() {
    try{
        await init();
        logger.info("Server is ready to accept connections");
        await connect();
        logger.info('Database is ready');
    }catch (err) {
        logger.error(err);
        process.exit(1);
    }
}

startup();


// A '.env' file-t nem szabad felrakni git-re, mert itt olyan értékeket fogunk tárolni, amit nem szabad megsoztani másokkal. ( port, db elérhetőség )