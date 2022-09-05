//This script can be used to validate api token

const {secret_key} = require('../key/keys')
module.exports = (req,res,next)=>{
   
    let token = req.query.access_token
    if(token == null){
        res.status(401).json({"error" : "Missing token"})
    }
       if(token == secret_key)
        next()
       else 
         res.status(401).json({"error" : "Invalid Token"})
}