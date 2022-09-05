//This script contains modules to convert amount in one currency to amount in another currency

//const databaseConnection = require('../databaseFunctionalities/databaseConnect'); 
const databaseUtilities = require('../source/databaseQueries');  

//function used to convert one currency amount to another
const convertCurrencyModular = (fromCurrency,toCurrency,amountToConvert) =>new Promise((resolve,reject)=>{
    if(fromCurrency == 'USD'){
        databaseUtilities.getCurrencyExchangeRate(toCurrency).then(result =>{
            let exchangeRate = result;
            let convertedAmount = amountToConvert * exchangeRate;
            return resolve(convertedAmount)
        }).catch(error =>{
            return reject(error)
        })
    }
    else{
        //convert fromCurrency to USD
        databaseUtilities.getCurrencyExchangeRate(fromCurrency).then(result0 =>{
            let exchangeRateOfFromCurrencyToBase = result0;
            let intermediateValue = amountToConvert / exchangeRateOfFromCurrencyToBase;

            //convert USD to required currency(toCurrency)
            databaseUtilities.getCurrencyExchangeRate(toCurrency).then(result1 => {
                let exchangeRateOfToCurrencyToBase = result1;
                let finalValue = intermediateValue * exchangeRateOfToCurrencyToBase;
                return resolve(finalValue);
            }).catch(errorFromGetToCurrencyCurrencyExchangeRate => {
                return reject(errorFromGetToCurrencyCurrencyExchangeRate);
            })
        }).catch(errorFromGetFromCurrencyExchangeRate => {
            return reject(errorFromGetFromCurrencyExchangeRate);
        })
    }
})


module.exports = {
    convertCurrencyModular
}