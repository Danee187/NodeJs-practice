const axios = require('axios');
const { currencyAPIKey } = require('./config');
const logger = require('./logger');

async function getCurrency() {
    return axios.get(`https://my.api.mockaroo.com/currency?key=${currencyAPIKey}`)
    /* .then((response) => {
        return response.data;
    }); */
    // Ez ugyan azt jelenti, mint a lenti első .then()-ág

    .then(response => response.data)
    .catch((err) => {
       // console.error(err); -> ez helyett winstont használunk
       logger.error(err);
        return { value: -1};
    });
}

module.exports = getCurrency;