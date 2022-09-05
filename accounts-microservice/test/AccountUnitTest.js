const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect=chai.expect;
const chaiAsPromised= require('chai-as-promised');
const request = require('request');

const validateEffectiveBalance = require("../utilities/validationsFromDatabase").validateEffectiveBalance;
const validateAcNumForTransfer = require("../utilities/validationsFromDatabase").validateAccountNumberForTransfer;


const validateAccount = require("../middleware/validationMiddleware").validationAccount;
const validateAmount = require("../middleware/validationMiddleware").validateAmount;
const validateUserId = require("../middleware/validationMiddleware").validateUserId;

const server = require("../index");
chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.should();


//unit testing
describe("Unit testing",()=>{
    describe("account number format validation",()=>{
        it("checked1",()=>{
            assert.equal(validateAccount("SB501"),true);
        });
        it("checked2",()=>{
            assert.equal(validateAccount("SB10000"),true);
        });
        it("checked3",()=>{
            assert.equal(validateAccount(""),false);
        });
        it("checked4",()=>{
            assert.equal(validateAccount("120"),false);
        });
        it("checked5",()=>{
            assert.equal(validateAccount("abc"),false);
        });
        
    })
    describe("userId validation",()=>{
        it("checked1",()=>{
            assert.equal(validateUserId("c1"),true);
        });
        it("checked2",()=>{
            assert.equal(validateUserId("12321"),false);
        });
        it("checked3",()=>{
            assert.equal(validateUserId(""),false);
        });
        it("checked4",()=>{
            assert.equal(validateUserId("c12"),true);
        });
    })
    describe("amount validation",()=>{
        it("checked1",()=>{
            assert.equal(validateAmount("20"),true);
        });
        it("checked2",()=>{
            assert.equal(validateAmount("se"),false);
        });
    });
});