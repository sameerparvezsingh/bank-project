//key-> error code, value-> error message
const errorMessages = {
                        01:{"message":"Access Denied, if you think it is a mistake contact Admin","status":401},
                        011:{"message":"Invalid password, please try again","status":401},
                        02:{"message":"Invalid Account Number","status":404},
                        022:{"message":"Account Number does not belong to user","status":404},
                        03:{"message":"Balance Not Enough","status":403},
                        04:{"message":"Receiver Account Number not found","status":404},
                        05:{"message":"Entered currency does not belong to sender or receiver account","status":406},
                        06:{"message":"from_account should be different than to_account","status":404},
                        07:{"message":"Transaction failed, Database error, please contact admin","status":406},
                        500:{"message":"Database error occured, please contact Admin","status":500},
                        501:{"message":"Database returned empty rows, please contact Admin","status":500}
                    }

const handleError = (errorCode,response) => {
    if(errorMessages[errorCode] != undefined){
        response.status(errorMessages[errorCode].status).json({ "status": false, "error": errorMessages[errorCode].message});
    }else{
        response.status(500).json({ "status": false, "error":'Undefined error unable to handle, please contact admin'});
    }
    
}



module.exports = {
    handleError
};








const errorMessagesImproved = {
    01:{"message":"Access Denied, if you think it is a mistake contact Admin","status":401},
    02:{"message":"Invalid Account Number","status":404},
    022:{"message":"Account Number does not belong to user","status":404},
    03:{"message":"Balance Not Enough","status":403},
    04:{"message":"Receiver Account Number not found","status":404},
    05:{"message":"Entered currency does not belong to sender or receiver account","status":406},
    06:{"message":"from_account should be different than to_account","status":404},
    07:{"message":"Transaction failed, Database error, please contact admin","status":406},
    500:{"message":"Database error occured, please contact Admin","status":500},
    501:{"message":"Database returned empty rows, please contact Admin","status":500}
}

const handleErrorImproved = (errorCode,errorObject,response) => {
    if(errorMessagesImproved[errorCode] != undefined){
        if(errorMessagesImproved[errorCode]<=500){
            response.status(errorMessagesImproved[errorCode].status).json({ "status": false, "error": errorMessagesImproved[errorCode].message});
        }
        else if(errorMessagesImproved[errorCode]==02 ){
            response.status(errorMessagesImproved[errorCode].status)
            .json({ "status": false, "error": errorObject.accountNumber +': ' + errorMessagesImproved[errorCode].message});
        }
        
    }else{
        response.status(500).json({ "status": false, "error":'Undefined error unable to handle, please contact admin'});
    }
    //(errorMessages[errorCode] != undefined)?resolve(errorMessages[errorCode]):reject('Undefined error unable to handle, please contact admin')
}
