//This script takes the mini statement and funds transfer request from swagger 
//and forwards it to the payments microservice using the apis provided by payments microservice 

const sendRequest = require('request');          //importing request module to make http requests
const configValues = require("../default.json");  //importing default.json file that contains important variables

//function to send data for funds transfer collected in request to Payments microservice
const forwardFundsTransferRequestFromSwaggerToPaymentsMicroservice = (request,response) =>{
    //extract data from http request's body
    let from_account = request.body.from_account;
    let to_account = request.body.to_account;
    let amount = request.body.amount;
    let UserId = request.body.userid;
    let currency = request.body.currency;
    let access_token = request.query.access_token;
    
    //configuration for http request
    const options = {
      url: `http://${configValues.api_host_payments}:${configValues.PORT_PAYMENTS_MICROSERVICE}/fund_transfer?access_token=${access_token}`,
      json: true,
      body: {
        "userid":UserId,
        "from_account":from_account,
        "to_account":to_account,
        "amount":amount,
        "currency":currency
      }
    };
    
    //using request module to make the above configured http POST request 
    sendRequest.post(options, (error, res, body) => {
      if(error) {
          response.status(401).json(error)
      }else if(body.status == 404) {response.status(404).json(body.error);}
      else if(body.status == 401) {response.status(401).json(body.error);}
      else response.status(200).json(body);
    })
}//end validateACWithUserid

//function to send data for Mini Statement collected in request to Payments microservice
const forwardMiniStatementRequestFromSwaggerToPaymentsMicroservice = (request,response) =>{
    //Extract data from request's query
    let Account_Number = request.query.Account_Number;
    let UserID = request.query.UserID;
    let access_token = request.query.access_token
  //console.log(Account_Number, UserID)
    //using request module to send http GET request to Payments Microservcice    
    sendRequest(`http://${configValues.api_host_payments}:${configValues.PORT_PAYMENTS_MICROSERVICE}/Mini_Statement?Account_Number=${Account_Number}&UserID=${UserID}&access_token=${access_token}`,
        { json: true }, 
        (err, res, body) => {
            if (err) { response.status(400).json(err); }
            else if(body.status == 404) {response.status(404).json(body.error);}
            else if(body.status == 401) {response.status(401).json(body.error);}
            else response.status(200).json(body);
            //response.status(200).json(body);
        });
}//end validateACWithUserid

//Exporting above defined functions for use in other scripts
module.exports = {
    forwardFundsTransferRequestFromSwaggerToPaymentsMicroservice,
    forwardMiniStatementRequestFromSwaggerToPaymentsMicroservice
}//end module.export
