const { Pool, Client } = require('pg')           
const configValues = require("../default.json");


const connectionString = configValues.postgresDatabaseConnectionURL; 

const pool = new Pool({
  connectionString,
})


module.exports = {
    pool
}