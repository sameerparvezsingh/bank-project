const validator = require('../helpers/validate');

function validationAccount(accountNumber){

    if(accountNumber.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i) && accountNumber.length>=1 && accountNumber.length<=120)
    {
        return true;
    }
    else
        return false;
}

function validateUserId(userid){
    if(userid.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i) && userid.length>=1){
        return true;
    }
    else
        return false;
}

function validateAmount(amount){
    if(!isNaN(amount))
        return true;
    else
        return false;

}

const checkInputForBalanceInquiry = (request, response, next) => {

    const validationRule = {
        "accountNumber": "required|string|min:1|max:120",
        "userid": "required|string"
    }
    //console.log(request.query.accountNumber);
    
    validator(request.query, validationRule, {}, (err, status) => {
        if (!status) {
            response.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });

}

const checkInputForFundsTransfer = (request, response, next) => {
    const validationRule = {
        "from_account": "required|string|min:1|max:120",
        "to_account": "required|string|min:1|max:120",
        "amount": "required|numeric|min:0",
        "userid": "required|string",
    }
        validator(request.body, validationRule, {}, (err, status) => {
            if (!status) {
                response.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                next();
            }
        });

}

const checkInputForMiniStatement = (request, response, next) => {
    const validationRule = {
        "Account_Number": "required|string|min:1|max:120",
        "UserID": "required|string"
    }
    
        validator(request.query, validationRule, {}, (err, status) => {
            if (!status) {
                response.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                next();
            }
        });
    
}

module.exports = { 
  checkInputForBalanceInquiry,
  checkInputForFundsTransfer,
  validationAccount,
  validateUserId,
  validateAmount,
  checkInputForMiniStatement
}
