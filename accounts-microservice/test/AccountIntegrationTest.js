const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect=chai.expect;
const chaiAsPromised= require('chai-as-promised');
const request = require('request');
const configValues = require('../default.json');





const validateAcWithUserid = require('../utilities/validationsFromDatabase').validateAccountNumberWithUserId;
const validateEffectiveBalance = require("../utilities/validationsFromDatabase").validateEffectiveBalance;
const validateAcNumForTransfer = require("../utilities/validationsFromDatabase").validateAccountNumberForTransfer;
const getTotalAccountBalance = require("../source/databaseQueries").getEffectiveBalanceForOneAccount;
const getAllDetailsRelatedToAccountNumber = require("../source/databaseQueries").getAllDetailsRelatedToAccountNumber;
const getAccountsRelatedToOneUserId = require("../source/databaseQueries").getAccountsRelatedToOneUserId;
const validateCurrencyAssociatedWithAccountNumberModular = require("../utilities/validationsFromDatabase").validateCurrencyAssociatedWithAccountNumber;
const convertCurrencyModular = require("../utilities/currencyConversion").convertCurrencyModular;
const getAvailabilityStatusOfAccountInDatabase = require("../source/databaseQueries").getAvailabilityStatusOfAccountInDatabase;
const getCurrencyDetailsForOneAccount=require("../source/databaseQueries").getCurrencyDetailsForOneAccount;
const getCurrencyExchangeRate=require("../source/databaseQueries").getCurrencyExchangeRate;
const updateBalance=require("../source/databaseQueries").updateBalance;
const checkInputForBalanceInquiry = require("../middleware/validationMiddleware").checkInputForBalanceInquiry;


// const validateAccount = require("../middleware/validationMiddleware").validationAccount;
// const validateAmount = require("../middleware/validationMiddleware").validateAmount;
// const validateUserId = require("../middleware/validationMiddleware").validateUserId;

const server = require("../index");
chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();

//Integration testing
describe('Capstone',()=>{
    
    describe('Testing validattion of Account With Userid',()=>{
        it('Account and UserId is associated',()=>{
            return expect(validateAcWithUserid("c1","SB501")).to.eventually.equal(true);
        });
        it('Account and userid not associated',()=>{
            return expect(validateAcWithUserid(10,"SB501")).to.eventually.equal(false);
        });
    });
   
    describe('Testing validation of EffectiveBalance',()=>{
        it('Amount available ',()=>{
            return expect(validateEffectiveBalance("SB504","4000")).to.eventually.equal(true);
        });
        it('Amount Not available ',()=>{
            return expect(validateEffectiveBalance("SB504","50000")).to.eventually.equal(false);
        });
    });
    describe('Testing validatetion of Account Number to Transfer',()=>{
        it('Account available',()=>{
            return expect(validateAcNumForTransfer("SB501")).to.eventually.equal(true);
        });
        it('Account Not available',()=>{
            return expect(validateAcNumForTransfer("SB505")).to.eventually.equal(false);
        });
    });
    describe("Testing getTotalAccountBalance",()=>{
        it("Returning Account Balance",()=>{
            var a= getTotalAccountBalance("SB504");
          
            return expect(a).to.eventually.equal('4000.00');
        });
        it("Returning Account Balance",()=>{
            var a= getTotalAccountBalance("SB10000");
            return expect(a).to.eventually.equal('500.00');
        });
    });

    describe("getAllDetailsRelatedToAccountNumber",()=>{
        it("checked",()=>{
            var a= getAllDetailsRelatedToAccountNumber("SB501");
          
            return expect(a).to.eventually.have.property('currency');
        });
    });

    
    describe("getAccountsRelatedToOneUserId",()=>{
        it("checked",()=>{
            var a= getAccountsRelatedToOneUserId("c1");
          
            return expect(a).to.eventually.deep.equal([
                { accountnumber: 'SB501' },
                { accountnumber: 'SB502' },
                { accountnumber: 'SB10001' }
              ]);
            //return expect(a).to.eventually.have.property([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]);
        });
    });

     describe("validateCurrencyAssociatedWithAccountNumberModular",()=>{
        it("checked",()=>{
            var a= validateCurrencyAssociatedWithAccountNumberModular("SB501","INR");
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal(true);
        });
    });
    describe("convertCurrencyModular",()=>{
        it("checked",()=>{
            var a= convertCurrencyModular("USD","INR",10);
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal(749.5);
        });
    });
    describe("convertCurrencyModular",()=>{
        it("checked",()=>{
            var a= convertCurrencyModular("USD","INR",10);
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal(749.5);
        });
    });
    
    describe("getAvailabilityStatusOfAccountInDatabase",()=>{
        it("checked",()=>{
            var a= getAvailabilityStatusOfAccountInDatabase("SB501");
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal(true);
        });
    });
    describe("getCurrencyDetailsForOneAccount",()=>{
        it("checked",()=>{
            var a= getCurrencyDetailsForOneAccount("SB501");
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal('INR');
        });
    });
    describe("getCurrencyExchangeRate",()=>{
        it("checked",()=>{
            var a= getCurrencyExchangeRate("INR");
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal('74.95');
        });
    });
    describe('updateBalance',()=>{
        it("checked",()=>{
            var a= updateBalance("SB501",0,'add');
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal(true);
        });
    });
    describe('updateBalance',()=>{
        it("checked",()=>{
            var a= updateBalance("SB501",0,'add');
          
            //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
            return expect(a).to.eventually.equal(true);
        });
    });
    // describe('checkInputForBalanceInquiry',()=>{
    //     it("checked",()=>{
    //         var a= checkInputForBalanceInquiry({},{},{});
          
    //         //return expect(a).to.eventually.equal(JSON.parse([{"accountnumber": "SB501"}, {"accountnumber": "SB502"}, {"accountnumber": "SB10001"}]));
    //         return expect(a).to.eventually.equal(false);
    //     });
    // });
});









//unit testing
// describe("Unit testing",()=>{
//     describe("account number format validation",()=>{
//         it("checked",()=>{
//             assert.equal(validateAccount("SB501"),true);
//         });
//     })
//     describe("userId validation",()=>{
//         it("checked",()=>{
//             assert.equal(validateUserId("c1"),true);
//         });
//     })
//     describe("amount validation",()=>{
//         it("checked",()=>{
//             assert.equal(validateAmount(20),true);
//         });
//     });
// });







// describe('Balance inquiry',()=>{
//     it("BI",(done)=>{
//         chai.request(`http://${configValues.api_host_accounts}:${configValues.PORT_BALANCE_INQUIRY}`).get("/balance_inquiry?accountNumber=SB501&userid=c1&access_token=8a702c3bfc0e79b36b382d33992a651e")
//         .end((err,res)=>{
//              res.should.have.status(200);
//              done();
//         })
//     });

// });
