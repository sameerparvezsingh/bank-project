//This file contains definition of all functions required by Accounts Microservice to 
//process requests made by Payments Microservice 

const databaseQueriesModules = require('../source/databaseQueries');  
const currencyConversion = require('./currencyConversion');  
const databaseValidations = require('./validationsFromDatabase');  
const errorHandler = require('../errorHandling');
const logger= require("../accountslogger")


const transferFundsRequestCR = (request,response) =>{
    amountsObject = request.body

    //getting various variables required to process the request
    let userRequestingUpdate = amountsObject.userid;
    let senderAccountNumber = amountsObject.senderAc;
    let receiverAccountNumber = amountsObject.receiverAc;
    let amountToTransfer = amountsObject.amountToTransfer;
    let currencyToTransfer = amountsObject.currency;
    
    
    databaseValidations.validateAccountNumberWithUserId(userRequestingUpdate,senderAccountNumber)
    .then(isAccountNumberValidForUser => {
        if(isAccountNumberValidForUser == true){ 
            databaseValidations.validateAccountNumberForTransfer(receiverAccountNumber)
           .then(isReceiverAccountNumberValid => {
                if(isReceiverAccountNumberValid == true){
                    //validate if currency requested to transfer belongs to sender account
                    databaseValidations.validateCurrencyAssociatedWithAccountNumber(senderAccountNumber,currencyToTransfer)
                    .then(isCurrencyEnteredAssociatedWithSenderAccount =>{
                        if(isCurrencyEnteredAssociatedWithSenderAccount == true){
                            databaseValidations.validateEffectiveBalance(senderAccountNumber,amountToTransfer)
                            .then(isBalanceEnoughInSenderAccount =>{
                                if(isBalanceEnoughInSenderAccount == true){
                                   //as currency to transfer belongs to sender account, directly subtract from sender's balance
                                    databaseQueriesModules.updateBalance(senderAccountNumber,amountToTransfer,'subtract')
                                    .then(resultUpdateBalanceForSender => {//if balance deducted from sender's account, add amount to receiver account
                                        //check what currency is associated with receiver's account
                                        //required to know what currency the transaction amount needs to be converted into
                                        databaseQueriesModules.getCurrencyDetailsForOneAccount(receiverAccountNumber)
                                        .then(currencyOfReceiverAccount =>{
                                            //convert sender currency to receiver currency
                                            currencyConversion.convertCurrencyModular(currencyToTransfer,currencyOfReceiverAccount,amountToTransfer)
                                            .then(moneyToAddToReceiverAccount => {
                                                databaseQueriesModules.updateBalance(receiverAccountNumber,moneyToAddToReceiverAccount,'add')
                                                .then(resultUpdateBalanceForReceiver => {
                                                    //if receiver account balance updated successfully, send data required by Payment Microservice
                                                    response.status(200).json({"status":true,
                                                                                "currency":{
                                                                                    "fromAmount":amountToTransfer,
                                                                                    "fromCurrency":currencyToTransfer,
                                                                                    "toAmount":moneyToAddToReceiverAccount,
                                                                                    "toCurrency":currencyOfReceiverAccount
                                                                                    }
                                                                                })
                                                }).catch(errorUpdateBalanceForReceiver => {
                                                    logger.error(errorUpdateBalanceForReceiver);
                                                    errorHandler.handleError(500,response);
                                                
                                                })
                                            }).catch(errorConvertCurrency => {
                                                logger.error(errorConvertCurrency);
                                                errorHandler.handleError(500,response);
                                                
                                            })
                                        }).catch(errorFromGetCurrencyDetail=>{
                                            logger.error(errorFromGetCurrencyDetail);
                                            errorHandler.handleError(500,response);
                                            
                                        })
                                    }).catch(errorUpdateBalanceforSender => {
                                        logger.error(errorUpdateBalanceforSender)
                                        errorHandler.handleError(500,response);
                                        
                                    })
                                }else if(isBalanceEnoughInSenderAccount == false){
                                    errorHandler.handleError(03,response);
                                }
                            }).catch(errorFromGetEffectiveBalance =>{
                                logger.error(errorFromGetEffectiveBalance)
                                errorHandler.handleError(500,response);
                            })
                        }//end if
                        else if(isCurrencyEnteredAssociatedWithSenderAccount == false){
                            //check if currency entered is same as currency associated with receiver account
                            databaseValidations.validateCurrencyAssociatedWithAccountNumber(receiverAccountNumber,currencyToTransfer)
                            .then(isCurrencyEnteredAssociatedWithReceiverAccount =>{
                                if(isCurrencyEnteredAssociatedWithReceiverAccount == true){
                                    databaseQueriesModules.updateBalance(receiverAccountNumber,amountToTransfer,'add')
                                    .then(resultUpdateBalanceInReceiveAccount => {
                                        //make a query to database to check what currency is associated with sender's account
                                        //this step is required to know what currency the transaction amount needs to be converted into
                                        databaseQueriesModules.getCurrencyDetailsForOneAccount(senderAccountNumber)
                                        .then(currencyOfSenderAccount =>{
                                            //call the currency conversion module to convert receiver currency to sender currency
                                            currencyConversion.convertCurrencyModular(currencyToTransfer,currencyOfSenderAccount,amountToTransfer)
                                            .then(amountConvertedForSender => {
                                                databaseValidations.validateEffectiveBalance(senderAccountNumber,amountConvertedForSender)
                                                .then(isBalanceEnough =>{
                                                    if(isBalanceEnough == true){
                                                        databaseQueriesModules.updateBalance(senderAccountNumber,amountConvertedForSender,'subtract')
                                                        .then(resultUpdateBalanceForReceiver => {
                                                            //if sender account balance updated successfully, send data required by Payment Microservice
                                                            response.status(200).json({"status":true,
                                                                                        "currency":{
                                                                                            "fromAmount":amountConvertedForSender,
                                                                                            "fromCurrency":currencyOfSenderAccount,
                                                                                            "toAmount":amountToTransfer,
                                                                                            "toCurrency":currencyToTransfer
                                                                                        }})
                                                        }).catch(errorInUpdatingSenderBalance => {
                                                            logger.error(errorInUpdatingSenderBalance)
                                                            errorHandler.handleError(500,response);
                                                        })
                                                    }
                                                    else if(isBalanceEnough == false){
                                                        errorHandler.handleError(03,response);
                                                    }
                                                }).catch(errorFromValidateEffectiveBalance => {
                                                    logger.error(errorFromValidateEffectiveBalance)
                                                    errorHandler.handleError(500,response);
                                                })
                                            }).catch(errorFromCurrencyConversion => {
                                                logger.error(errorFromCurrencyConversion)
                                                errorHandler.handleError(500,response);
                                            })
                                        }).catch(errorFromGetCurrencyDetail=>{
                                            logger.error(errorFromGetCurrencyDetail)
                                            errorHandler.handleError(500,response);
                                        }) 
                                    }).catch(errorUpdateBalanceInReceiverAccount => {
                                        logger.error(errorUpdateBalanceInReceiverAccount)
                                        errorHandler.handleError(500,response);
                                    })  
                                }
                                else if(isCurrencyEnteredAssociatedWithReceiverAccount == false){//currency requested associates neither with sender account, nor with receiver account
                                    errorHandler.handleError(05,response);
                                }
                            }).catch(errorValidateCurrencyAssociatedWithAccount => {
                                logger.error(errorValidateCurrencyAssociatedWithAccount)
                                errorHandler.handleError(500,response);
                            })
                        }//end else if from validateCurrencyAssociatedWithAccountNumber
                    }).catch(errorValidateCurrencyAssociatedWithAccountNumber => {
                        logger.error(errorValidateCurrencyAssociatedWithAccountNumber)
                        errorHandler.handleError(500,response);
                    })
                }else if(isReceiverAccountNumberValid == false){
                    errorHandler.handleError(04,response);
                }
            }).catch(errorValidateAccountNumberForTransfer => {
                    logger.error(errorValidateAccountNumberForTransfer)
                    errorHandler.handleError(500,response);
                })
        }else if(isAccountNumberValidForUser == false){
            errorHandler.handleError(022,response);
        }
    }).catch(errorValidateAccountNumberWithUserId => {
        logger.error(errorValidateAccountNumberWithUserId)
        errorHandler.handleError(500,response);
    })
}//end transferFundsRequest

//function to process mini statement validations requested by Paymennt microservice
const validateAccountNumberWithUserIdForMiniStatement =(request, response) => {
    amountsObject = request.body
    let userIdToCheck = amountsObject.userid;
    let accountNumberToCheck = amountsObject.accountNumber;

    //Validate if the sender account belongs to the client making request by checking association of account number with user id
    databaseValidations.validateAccountNumberWithUserId(userIdToCheck,accountNumberToCheck)
    .then(isAccountNumberValidForUser => {
        if(isAccountNumberValidForUser == true){
            //get effective balance to be shown with transaction details as required in SRS
            databaseQueriesModules.getEffectiveBalanceForOneAccount(accountNumberToCheck)
           .then(returnedEffectiveBalance =>{
               if(returnedEffectiveBalance != false){
                    //get currency details to be shown along with effective balance
                    databaseQueriesModules.getCurrencyDetailsForOneAccount(accountNumberToCheck)
                    .then(currencyForAccount =>{
                        //set status to true for payment microservice to recognize that query was successful
                        response.status(200).json({"status":true,
                                                    "balance":returnedEffectiveBalance,
                                                    "currency":currencyForAccount
                                                })
                    }).catch(errorFromCurrecyDetails => {
                        logger.error(errorFromCurrecyDetails)
                        errorHandler.handleError(500,response);
                    })
               }else{
                   errorHandler.handleError(501,response);
               }
            }).catch(errorGetEffectiveBalance =>{
                logger.error(errorGetEffectiveBalance)
                errorHandler.handleError(500,response);
            })
        }else if(isAccountNumberValidForUser == false){
            errorHandler.handleError(022,response);
        }
    }).catch(errorValidateAccountNumberWithUserId => {
        logger.error(errorValidateAccountNumberWithUserId)
        errorHandler.handleError(500,response);
    })
} 

//prototypes
const rollbackTransaction =(request, response) => {
    amountsObject = request.body
    let fromAccount = amountsObject.fromAccount;
    let fromAmount = amountsObject.fromAmount;
    let toAccount = amountsObject.toAccount;
    let toAmount = amountsObject.toAmount;

    databaseQueriesModules.updateBalanceWithLocks(fromAccount,fromAmount,'add').then(result =>{
        databaseQueriesModules.updateBalanceWithLocks(toAccount,toAmount,'subtract').then(result =>{
            response.status(200).json({'status':true,"message":'Transaction rolled back successfully'})
        }).catch(errorFromUpdateToAccountBalance =>{
            logger.error(errorFromUpdateToAccountBalance);
            errorHandler.handleError(500,response);
        })
    }).catch(erroFromUpdateFromAccountBalance =>{
        logger.error(erroFromUpdateFromAccountBalance);
        errorHandler.handleError(500,response)
    })
} 

const transferFundsRequestWithLocks = (request,response) =>{
    amountsObject = request.body

    //getting various variables required to process the request
    let userRequestingUpdate = amountsObject.userid;
    let senderAccountNumber = amountsObject.senderAc;
    let receiverAccountNumber = amountsObject.receiverAc;
    let amountToTransfer = amountsObject.amountToTransfer;
    let currencyToTransfer = amountsObject.currency;
    
    
    databaseValidations.validateAccountNumberWithUserId(userRequestingUpdate,senderAccountNumber)
    .then(isAccountNumberValidForUser => {
        if(isAccountNumberValidForUser == true){ 
            databaseValidations.validateAccountNumberForTransfer(receiverAccountNumber)
           .then(isReceiverAccountNumberValid => {
                if(isReceiverAccountNumberValid == true){
                    //validate if currency requested to transfer belongs to sender account
                    databaseValidations.validateCurrencyAssociatedWithAccountNumber(senderAccountNumber,currencyToTransfer)
                    .then(isCurrencyEnteredAssociatedWithSenderAccount =>{
                        if(isCurrencyEnteredAssociatedWithSenderAccount == true){
                            databaseValidations.validateEffectiveBalance(senderAccountNumber,amountToTransfer)
                            .then(isBalanceEnoughInSenderAccount =>{
                                if(isBalanceEnoughInSenderAccount == true){
                                   //as currency to transfer belongs to sender account, directly subtract from sender's balance
                                    databaseQueriesModules.updateBalanceWithLocks(senderAccountNumber,amountToTransfer,'subtract')
                                    .then(resultUpdateBalanceForSender => {
                                        if(resultUpdateBalanceForSender == true){
                                        //check what currency is associated with receiver's account
                                        //required to know what currency the transaction amount needs to be converted into
                                        databaseQueriesModules.getCurrencyDetailsForOneAccount(receiverAccountNumber)
                                        .then(currencyOfReceiverAccount =>{
                                            //convert sender currency to receiver currency
                                            currencyConversion.convertCurrencyModular(currencyToTransfer,currencyOfReceiverAccount,amountToTransfer)
                                            .then(moneyToAddToReceiverAccount => {
                                                databaseQueriesModules.updateBalanceWithLocks(receiverAccountNumber,moneyToAddToReceiverAccount,'add')
                                                .then(resultUpdateBalanceForReceiver => {
                                                    //if receiver account balance updated successfully, send data required by Payment Microservice
                                                    if(resultUpdateBalanceForReceiver == true){
                                                        response.status(200).json({"status":true,
                                                                                "currency":{
                                                                                    "fromAmount":amountToTransfer,
                                                                                    "fromCurrency":currencyToTransfer,
                                                                                    "toAmount":moneyToAddToReceiverAccount,
                                                                                    "toCurrency":currencyOfReceiverAccount
                                                                                    }
                                                                                })
                                                    }else if(resultUpdateBalanceForReceiver == false){
                                                        errorHandler.handleError(07,response);
                                                    }
                                                    
                                                }).catch(errorUpdateBalanceForReceiver => {
                                                    logger.error(errorUpdateBalanceForReceiver);
                                                    errorHandler.handleError(500,response);
                                                
                                                })
                                            }).catch(errorConvertCurrency => {
                                                logger.error(errorConvertCurrency);
                                                errorHandler.handleError(500,response);
                                                
                                            })
                                        }).catch(errorFromGetCurrencyDetail=>{
                                            logger.error(errorFromGetCurrencyDetail);
                                            errorHandler.handleError(500,response);
                                            
                                        })
                                    }else if(resultUpdateBalanceForSender == false){
                                        errorHandler.handleError(07,response);
                                    }
                                    }).catch(errorUpdateBalanceforSender => {
                                        logger.error(errorUpdateBalanceforSender)
                                        errorHandler.handleError(500,response);
                                        
                                    })
                                }else if(isBalanceEnoughInSenderAccount == false){
                                    errorHandler.handleError(03,response);
                                }
                            }).catch(errorFromGetEffectiveBalance =>{
                                logger.error(errorFromGetEffectiveBalance)
                                errorHandler.handleError(500,response);
                            })
                        }//end if
                        else if(isCurrencyEnteredAssociatedWithSenderAccount == false){
                            //check if currency entered is same as currency associated with receiver account
                            databaseValidations.validateCurrencyAssociatedWithAccountNumber(receiverAccountNumber,currencyToTransfer)
                            .then(isCurrencyEnteredAssociatedWithReceiverAccount =>{
                                if(isCurrencyEnteredAssociatedWithReceiverAccount == true){
                                    databaseQueriesModules.updateBalanceWithLocks(receiverAccountNumber,amountToTransfer,'add')
                                    .then(resultUpdateBalanceInReceiveAccount => {
                                        if(resultUpdateBalanceInReceiveAccount == true){
                                        //make a query to database to check what currency is associated with sender's account
                                        //this step is required to know what currency the transaction amount needs to be converted into
                                        databaseQueriesModules.getCurrencyDetailsForOneAccount(senderAccountNumber)
                                        .then(currencyOfSenderAccount =>{
                                            //call the currency conversion module to convert receiver currency to sender currency
                                            currencyConversion.convertCurrencyModular(currencyToTransfer,currencyOfSenderAccount,amountToTransfer)
                                            .then(amountConvertedForSender => {
                                                databaseValidations.validateEffectiveBalance(senderAccountNumber,amountConvertedForSender)
                                                .then(isBalanceEnough =>{
                                                    if(isBalanceEnough == true){
                                                        databaseQueriesModules.updateBalanceWithLocks(senderAccountNumber,amountConvertedForSender,'subtract')
                                                        .then(resultUpdateBalanceForSender => {
                                                            //if sender account balance updated successfully, send data required by Payment Microservice
                                                            if(resultUpdateBalanceForSender == true){
                                                                response.status(200).json({"status":true,
                                                                                        "currency":{
                                                                                            "fromAmount":amountConvertedForSender,
                                                                                            "fromCurrency":currencyOfSenderAccount,
                                                                                            "toAmount":amountToTransfer,
                                                                                            "toCurrency":currencyToTransfer
                                                                                        }})
                                                            }else if(resultUpdateBalanceForSender == false){
                                                                errorHandler.handleError(07,response);
                                                            }
                                                        }).catch(errorInUpdatingSenderBalance => {
                                                            logger.error(errorInUpdatingSenderBalance)
                                                            errorHandler.handleError(500,response);
                                                        })
                                                    }
                                                    else if(isBalanceEnough == false){
                                                        errorHandler.handleError(03,response);
                                                    }
                                                }).catch(errorFromValidateEffectiveBalance => {
                                                    logger.error(errorFromValidateEffectiveBalance)
                                                    errorHandler.handleError(500,response);
                                                })
                                            }).catch(errorFromCurrencyConversion => {
                                                logger.error(errorFromCurrencyConversion)
                                                errorHandler.handleError(500,response);
                                            })
                                        }).catch(errorFromGetCurrencyDetail=>{
                                            logger.error(errorFromGetCurrencyDetail)
                                            errorHandler.handleError(500,response);
                                        })
                                    }else if(resultUpdateBalanceInReceiveAccount == false){
                                        errorHandler.handleError(07,response);
                                    }
                                    }).catch(errorUpdateBalanceInReceiverAccount => {
                                        logger.error(errorUpdateBalanceInReceiverAccount)
                                        errorHandler.handleError(500,response);
                                    })  
                                }
                                else if(isCurrencyEnteredAssociatedWithReceiverAccount == false){//currency requested associates neither with sender account, nor with receiver account
                                    errorHandler.handleError(05,response);
                                }
                            }).catch(errorValidateCurrencyAssociatedWithAccount => {
                                logger.error(errorValidateCurrencyAssociatedWithAccount)
                                errorHandler.handleError(500,response);
                            })
                        }//end else if from validateCurrencyAssociatedWithAccountNumber
                    }).catch(errorValidateCurrencyAssociatedWithAccountNumber => {
                        logger.error(errorValidateCurrencyAssociatedWithAccountNumber)
                        errorHandler.handleError(500,response);
                    })
                }else if(isReceiverAccountNumberValid == false){
                    errorHandler.handleError(04,response);
                }
            }).catch(errorValidateAccountNumberForTransfer => {
                    logger.error(errorValidateAccountNumberForTransfer)
                    errorHandler.handleError(500,response);
                })
        }else if(isAccountNumberValidForUser == false){
            errorHandler.handleError(022,response);
        }
    }).catch(errorValidateAccountNumberWithUserId => {
        logger.error(errorValidateAccountNumberWithUserId)
        errorHandler.handleError(500,response);
    })
}


module.exports = {
    transferFundsRequestCR,
    validateAccountNumberWithUserIdForMiniStatement,
    rollbackTransaction,
    transferFundsRequestWithLocks    
}
