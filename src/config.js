// Itt érhetőek el az alkalmazás konfigurációi
const joi = require('joi');

//joi.attempt() - Kap egy value-t és megkap egy shémát és összehasonlítja a kettőt. Végén kao egy true/fals
const configSchema = joi.object({
    PORT: joi.number().default(3000),
    CURRENCY_API_KEY: joi.string().required(),
    LOG_LEVEL: joi.string().default('info'),
    DB_URI: joi.string().required(),
}).unknown().required(); 

const validatedConfig = joi.attempt(process.env, configSchema);

//const DEFAULT_PORT = 3000; -- joi hozza be 

const config = {
    port: validatedConfig.PORT || DEFAULT_PORT,
    currencyAPIKey: validatedConfig.CURRENCY_API_KEY,
    logLevel: validatedConfig.LOG_LEVEL,
    dbURI: validatedConfig.DB_URI
};

module.exports = config;  // Így teszük elérhetővé a 'config' változó értékét.