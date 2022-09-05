const databaseConnection = require('./databaseConnect')

const accountsTable='accountDetails'; //table to make account related queries
const usersTable='userDetails';      //table to make userid:account number related queries
//query functions

//function to update balance(increase, decrease) in database
const updateBalance = (accountNumberToUpdate,amountToChange,actionToPerform) => new Promise((resolve,reject) => {
    let queryStatementToUpdateBalance =' '
    if(actionToPerform == 'add'){
        queryStatementToUpdateBalance =`UPDATE ${accountsTable} SET balanceamt=balanceamt+$1 WHERE accountnumber = $2`  
    }else if(actionToPerform == 'subtract'){
        queryStatementToUpdateBalance =`UPDATE ${accountsTable} SET balanceamt=balanceamt-$1 WHERE accountnumber = $2`
    }
    databaseConnection.pool.query(
    queryStatementToUpdateBalance,
    [amountToChange,accountNumberToUpdate],
    (error, results) => {
      if (error) {
        return reject(error)
      }
      return resolve(true);
    }
  )
})


//function to get total balance of an account
const getEffectiveBalanceForOneAccount = (accountNumber) => new Promise((resolve,reject)=>{
    let queryStatementForTotalBalance=`SELECT effectivebal FROM ${accountsTable} WHERE accountnumber = $1`
    databaseConnection.pool.query(queryStatementForTotalBalance, [accountNumber], 
    (error, results) => {
        if (error) {
            return reject(error)
        }
        if(results.rows[0] != null){
            return resolve(results.rows[0].effectivebal);
        }
        else{
            return resolve(false);
        }
        
      })
})

//function to select all columns from accountsetails table
const getAllDetailsRelatedToAccountNumber = (accountNumber) => new Promise((resolve,reject)=>{
    let queryStatementForAllDetails = `SELECT * FROM ${accountsTable} WHERE accountnumber = $1`;
    databaseConnection.pool.query(queryStatementForAllDetails, [accountNumber], 
    (error, results) => {
        if (error) {
            return reject(error)
        }
        if(results.rows[0] != null){
            return resolve(results.rows[0])
        }
        else{
            return resolve(false)
        }
        //console.log(results.rows[0])
        
      })
})

//function to get all accounts belonging to one user id from userdetails table
const getAccountsRelatedToOneUserId = (userIdToGetAccountsFor) => new Promise((resolve,reject)=>{
    let queryStatementToGetAccounts = `SELECT accountnumber from ${usersTable} WHERE userid=$1`
    databaseConnection.pool.query(queryStatementToGetAccounts, [userIdToGetAccountsFor], 
    (error, results) => {
        if (error) {
            return reject(error)
        }
        if(results.rows != null){
            return resolve(results.rows)
        }
        else{
            return resolve(false)
        }
      })
})

//function to check if an account exists in database
const getAvailabilityStatusOfAccountInDatabase = (accountNumber) => new Promise((resolve,reject)=>{
    let queryStatementForValidatingAccountNumber = `select exists(select 1 from ${accountsTable} where accountnumber= $1) AS "exists"`
    databaseConnection.pool.query(
    queryStatementForValidatingAccountNumber,
    [accountNumber],
    (error, results) => {
      if (error) {
        reject(error)
      }
      if(results.rows != null){
        return resolve(results.rows[0].exists)
      }
      else{
        return resolve(false)
      }
      //resolve(results.rows[0].exists)
      //results.rows[0].exists?resolve(true):resolve(false);
   })
})

//function to check the currency associated with an account in database
const getCurrencyDetailsForOneAccount = (accountNumber) => new Promise((resolve,reject)=>{
    let queryStatementToGetAccounts = `SELECT currency from ${accountsTable} WHERE accountnumber=$1`
    databaseConnection.pool.query(queryStatementToGetAccounts, [accountNumber], 
    (error, results) => {
        if (error) {
            return reject(error)
        }
        return resolve(results.rows[0].currency)
    })
})

//function to retrieve exchange rante from exchangeCurrency table
const getCurrencyExchangeRate = (toCurrency) => new Promise((resolve,reject)=>{
    let queryStatementToGetAccounts = `SELECT value from dummycurrencyexchange WHERE tocurrency=$1`
        databaseConnection.pool.query(queryStatementToGetAccounts, [toCurrency], 
        (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results.rows[0].value) //returned exchange rate returned
        })
})

const updateBalanceWithLocks = (accountNumberToUpdate,amountToChange,actionToPerform) => new Promise((resolve,reject) => {
    let queryStatementToUpdateBalance =' '
    if(actionToPerform == 'add'){
        queryStatementToUpdateBalance =`UPDATE ${accountsTable} SET balanceamt=balanceamt+$1 WHERE accountnumber = $2`  
    }else if(actionToPerform == 'subtract'){
        queryStatementToUpdateBalance =`UPDATE ${accountsTable} SET balanceamt=balanceamt-$1 WHERE accountnumber = $2`
    }
    databaseConnection.pool.connect((err, client, done) => {
      const shouldAbort = err => {
        if (err) {
          console.log('Error in transaction line 137', err)
          client.query('ROLLBACK', err => {
            if (err) {
              console.log('Error rolling back client', err)
              reject(err)
            }
            // release the client back to the pool
            resolve(false)
          })
        }
        return !!err
      }
        client.query('BEGIN', err => {
          if (shouldAbort(err)) {
            console.log('line 152')
            console.log(err)
            return}
          const queryText = `LOCK TABLE accountdetails IN SHARE ROW EXCLUSIVE MODE`
          client.query(queryText, (err, res) => {
            if (shouldAbort(err)) {
              console.log('line 158')
              console.log(err)
              return}
            client.query(queryStatementToUpdateBalance, 
                [amountToChange,accountNumberToUpdate], (err, res) => {
              if (shouldAbort(err)) {
                console.log('line 164')
                console.log(err)
                return}
              client.query('COMMIT', err => {
                if (err) {
                  console.log('Error committing transaction line 160', err)
                  reject(err)
                }
                resolve(true)
              })
            })
          })
        })
      })
})

const getAvailabilityStatusOfUserInDatabase = (useridToValidate) => new Promise((resolve,reject)=>{
  let queryStatementForValidatingAccountNumber = `select exists(select 1 from dummylogin where userid= $1) AS "exists"`
  databaseConnection.pool.query(
  queryStatementForValidatingAccountNumber,
  [useridToValidate],
  (error, results) => {
    if (error) {
      reject(error)
    }
    if(results.rows != null){
      return resolve(results.rows[0].exists)
    }
    else{
      return resolve(false)
    }
    //resolve(results.rows[0].exists)
    //results.rows[0].exists?resolve(true):resolve(false);
 })
})




const getLoginDetails = (userIdToAuthenticate) => new Promise((resolve,reject)=>{
  let queryStatementToGetAccounts = `SELECT password from dummylogin WHERE userid=$1`
      databaseConnection.pool.query(queryStatementToGetAccounts, [userIdToAuthenticate], 
      (error, results) => {
          if (error) {
              return reject(error)
          }
          return resolve(results.rows[0].password)
      })
})






module.exports = {
    updateBalance,
    getEffectiveBalanceForOneAccount,
    getAllDetailsRelatedToAccountNumber,
    getAccountsRelatedToOneUserId,
    getAvailabilityStatusOfAccountInDatabase,
    getCurrencyDetailsForOneAccount,
    getCurrencyExchangeRate,
    updateBalanceWithLocks,
    getAvailabilityStatusOfUserInDatabase,
    getLoginDetails
}