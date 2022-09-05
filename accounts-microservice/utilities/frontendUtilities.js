const databaseQueriesModules = require('../source/databaseQueries');  
const currencyConversion = require('./currencyConversion');  
const databaseValidations = require('./validationsFromDatabase');  
const errorHandler = require('../errorHandling');
const logger= require("../accountslogger")


const getAccountsForUserId = (request, response)  =>{
    let userIdToCheck = request.body.userid;
    //gets the list of all accounts linked to a particular user id
    databaseQueriesModules.getAccountsRelatedToOneUserId(userIdToCheck).then(returnedAccounts =>{
        if(returnedAccounts != false){
            response.status(200).json(returnedAccounts);
        }else{
            errorHandler.handleError(501,response);
        }
    }).catch(errorFromGetAccountsRelatedToOneUserId =>{
        logger.error(errorFromGetAccountsRelatedToOneUserId)
        errorHandler.handleError(500,response);
    })
}//end validateACWithUserid

module.exports ={
    getAccountsForUserId
}