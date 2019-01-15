// Itt érhetőek el az alkalmazás konfigurációi
const DEFAULT_PORT = 3000;
const config = {
    port: process.env.PORT || DEFAULT_PORT
}

module.exports = config;  // Így teszük elérhetővé a 'config' változó értékét.