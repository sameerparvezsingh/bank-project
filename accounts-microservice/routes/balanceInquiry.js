//This script is used to process the balance inquiry request

const databaseQueriesModules = require('../source/databaseQueries') 
const databaseValidations = require('../utilities/validationsFromDatabase'); 
const errorHandler = require('../errorHandling');
const logger= require("../accountslogger")

//Handles http request to /balance_inquiry API with appropriate response
const getUserDetailsByAccountNumber =  (request, response) => {
    
    if(typeof request.query.accountNumber !== 'undefined' && typeof request.query.userid !== 'undefined' ) {
         var accountNumberToCheck = request.query.accountNumber  
         var userIdToInquire = request.query.userid              
    }

    //Check if the account number belongs to the requesting user's user id
    databaseValidations.validateAccountNumberWithUserId(userIdToInquire,accountNumberToCheck)
    .then(isAccountNumberValid => {
        if(isAccountNumberValid == true){  
            databaseQueriesModules.getAllDetailsRelatedToAccountNumber(accountNumberToCheck)
            .then(resultFromGetAllDetailsRealtedToAccountNumber =>{
                if(resultFromGetAllDetailsRealtedToAccountNumber != false){
                    response.status(200).json(resultFromGetAllDetailsRealtedToAccountNumber);
                }else{
                    errorHandler.handleError(501,response);
                }
            }).catch(errorFromGetDetailsRelatedToAccountNumber => {
                logger.error(errorFromGetDetailsRelatedToAccountNumber);
                errorHandler.handleError(500,response);
            })
        }else if(isAccountNumberValid == false){ 
            errorHandler.handleError(022,response)
        }
    }).catch(errorFromValidateAccountNumber => { 
        logger.error(errorFromValidateAccountNumber)
        errorHandler.handleError(500,response);
    })
}


module.exports = {
    getUserDetailsByAccountNumber
}