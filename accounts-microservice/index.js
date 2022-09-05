//This script defines all services required for handling api request
//And is entry point of client requests
const bodyParser = require('body-parser');
const cors = require('cors');      
const express = require('express');                
const swaggerUI = require("swagger-ui-express"); 
const YAML = require("yamljs");                                          
const logger= require("./accountslogger")
const configValues = require("./default.json");  //importing default.json file that contains important variables


const authenticateUserLogin = require('./utilities/authMicroserviceUtility')
const autheticateApiToken = require('./middleware/authentication') 
const balanceInquiryRoute = require('./routes/balanceInquiry')
const swaggerJSDocs = YAML.load("./api.yaml");         //import configuratoin file for Swagger UI
const swaggerForward = require('./utilities/swaggerForward')
const frontendUtilities = require('./utilities/frontendUtilities')     
const paymentsMicroserviceUtilitiesRoute = require('./utilities/paymentsMicroserviceUtilities'); 
const validate = require('./middleware/validationMiddleware')   //import module to validate inputs entered by client in swagger UI

const apiBalanceInquiry = express();             
const portAPIBalanceInquiry = configValues.PORT_BALANCE_INQUIRY; 

const apiIPC = express();                        
const portApiIpc = configValues.PORT_IPC_API;    //extracting port number from default.json to run apiIPC 

apiBalanceInquiry.use(cors());
apiBalanceInquiry.use(bodyParser.json());       
apiBalanceInquiry.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

apiBalanceInquiry.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs)); 

apiIPC.use(cors());
apiIPC.use(bodyParser.json());
apiIPC.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//start listening on a portAPIBalanceInquiry
module.exports = apiBalanceInquiry.listen(portAPIBalanceInquiry, () => {
    logger.info(`Balance Inquiry API running on portAPIBalanceInquiry ${portAPIBalanceInquiry}.`);
})

//apis for external usage

//route to respond to GET request to root to check if server is online
apiBalanceInquiry.get('/', autheticateApiToken,async (request, response) => {
  response.json({ info: 'Welcome to the bank server' });
})

//Route to process Balance Inuiry request from client
apiBalanceInquiry.get('/balance_inquiry', autheticateApiToken,validate.checkInputForBalanceInquiry,balanceInquiryRoute.getUserDetailsByAccountNumber);

//for swagger UI
apiBalanceInquiry.post('/funds_transfer',validate.checkInputForFundsTransfer,swaggerForward.forwardFundsTransferRequestFromSwaggerToPaymentsMicroservice)
apiBalanceInquiry.get('/Mini_Statement',validate.checkInputForMiniStatement,swaggerForward.forwardMiniStatementRequestFromSwaggerToPaymentsMicroservice)



//API for inter service communication
module.exports= apiIPC.listen(portApiIpc, () => {
  logger.info(`IPC API running on portApiIpc ${portApiIpc}.`);
})

//apis for internal usage
apiIPC.put('/transferFundsRequest',paymentsMicroserviceUtilitiesRoute.transferFundsRequestCR);
apiIPC.get('/validationsForMiniStatement/',paymentsMicroserviceUtilitiesRoute.validateAccountNumberWithUserIdForMiniStatement)
apiIPC.get('/validateLogin',authenticateUserLogin.validateUserLoginCredentials)
apiIPC.post('/getAccountsForUser',frontendUtilities.getAccountsForUserId)

//prototypes
apiIPC.put('/rollbackTransaction',paymentsMicroserviceUtilitiesRoute.rollbackTransaction);
apiIPC.put('/transferFundsRequestWithLock',paymentsMicroserviceUtilitiesRoute.transferFundsRequestWithLocks);
//apiIPC.get('/asyncStatement',require('./utilities/paymentAsync').validateAccountNumberWithUserIdForMiniStatement)


require('./middleware/error')