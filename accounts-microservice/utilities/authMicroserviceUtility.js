const databaseValidations = require('./validationsFromDatabase');  
const errorHandler = require('../errorHandling');
const logger= require("../accountslogger")

const validateUserLoginCredentials =(request, response) => {
    
    let userIdToCheck = request.query.userid;
    let passwordToCheck = request.query.password;

    databaseValidations.validateUserIdInDatabase(userIdToCheck).then(isUserPresent =>{
        //console.log(isUserPresent)
        if(isUserPresent == true){
            databaseValidations.validatePasswordForUser(userIdToCheck,passwordToCheck)
            .then(isPasswordValid => {
                if(isPasswordValid == true){
                    response.status(200).json({"status":true})
                }else if(isPasswordValid == false){
                    //console.log("invalid pass")
                    response.status(200).json({"status":false,"error":"Invalid Password"})
                }
            }).catch(errorValidatePasswordForUser => {
                logger.error(errorValidatePasswordForUser)
                errorHandler.handleError(500,response);
            })
        }else if(isUserPresent == false){
            //console.log("invalid userid")
            response.status(200).json({"status":false,"error":"Invalid UserId"})
        }
    }).catch(errorGetUserStatus => {
        logger.error(errorGetUserStatus);
    })




    
}

module.exports = {
    validateUserLoginCredentials
}