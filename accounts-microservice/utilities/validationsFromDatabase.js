const databaseQueriesModules = require('../source/databaseQueries')

//function to validate if an account number belongs to a particular user id
const validateAccountNumberWithUserId = (userIdToCheck,accountNumberToCheck) => new Promise((resolve, reject) =>{
    let flagToCheckAccountNumberMatch=0;
    //gets the list of all accounts linked to a particular user id
    databaseQueriesModules.getAccountsRelatedToOneUserId(userIdToCheck).then(returnedAccounts =>{
        //perform linear search to check if account number is present in list or not
        for(var iterateReturnedAccounts=0;iterateReturnedAccounts<returnedAccounts.length;iterateReturnedAccounts++){
            if(accountNumberToCheck == (returnedAccounts[iterateReturnedAccounts].accountnumber)){
                flagToCheckAccountNumberMatch = 1;
                break; //break if match is found
            }else{
                flagToCheckAccountNumberMatch = 0;
            }
        }
        //return true if account found and false if account not found
        (flagToCheckAccountNumberMatch==1)? resolve(true): resolve(false);
    }).catch(errorFromGetAccountsRelatedToOneUserId =>{
        //if any error is thrown by database is caught and re-thrown
        reject(errorFromGetAccountsRelatedToOneUserId)
    })
})//end validateACWithUserid

//function to validate if amount to transfer is less or equal to effective account balance
const validateEffectiveBalance = (accountNumberToCheck,transferAmount) => new Promise((resolve, reject) =>{
    let amountToTransferLocal = (parseFloat(transferAmount));
    databaseQueriesModules.getEffectiveBalanceForOneAccount(accountNumberToCheck).then(result =>{
    let effectiveBalanceLocal = (parseFloat(result));
    
    (amountToTransferLocal <= effectiveBalanceLocal)?resolve(true):resolve(false);
    }).catch(errorFromGetEffectiveBalance =>{
        reject(errorFromGetEffectiveBalance)
    })
    
})//end validateEffectiveBalanceModular

//function to check if an account number exists in database
const validateAccountNumberForTransfer = (accountNumberToCheck) => new Promise((resolve,reject) => {
    
    databaseQueriesModules.getAvailabilityStatusOfAccountInDatabase(accountNumberToCheck).then(result=>{
        //return true if account found and false if account not found
        if(result){
            return resolve(true);
        }
        else{
            return resolve(false);
        }
    }).catch(error=>{
        reject(error);
    })  
});//end validateAccountNumberForTransferModular function

//function to check if an account numer has balance in entered currency or not
const validateCurrencyAssociatedWithAccountNumber = (accountNumberToCheck,currencyToCheck) => new Promise((resolve,reject) => {
    databaseQueriesModules.getCurrencyDetailsForOneAccount(accountNumberToCheck).then(result =>{
        //return true if currency belongs to account otherwise return false
        (currencyToCheck == result)?resolve(true):resolve(false);
    }).catch(error =>{
        reject(error);
    })
});//end validateAccountNumberForTransfer function


const validateUserIdInDatabase = (userIdToValidate) => new Promise((resolve,reject) => {
    
    databaseQueriesModules.getAvailabilityStatusOfUserInDatabase(userIdToValidate).then(result=>{
        //return true if user found and false if user not found
        if(result){
            return resolve(true);
        }
        else{
            return resolve(false);
        }
    }).catch(error=>{
        reject(error);
    })  
});



const validatePasswordForUser = (userIdToVerify,passwordForUser) => new Promise((resolve, reject) =>{
    
    databaseQueriesModules.getLoginDetails(userIdToVerify).then(returnedPassword =>{
        if(returnedPassword != null){
            (returnedPassword === passwordForUser)?resolve(true):resolve(false);
        }else{
            reject('database returned empty rows')
        }
    }).catch(errorFromGetLoginDetails=>{
        reject(errorFromGetLoginDetails)
    })
})


module.exports = {
    validateAccountNumberWithUserId,
    validateEffectiveBalance,
    validateAccountNumberForTransfer,
    validateCurrencyAssociatedWithAccountNumber,
    validateUserIdInDatabase,
    validatePasswordForUser
}//end module.export
