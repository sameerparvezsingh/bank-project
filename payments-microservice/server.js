require('dotenv').config()

const express = require('express')
const fs = require('fs')
const path = require('path');

const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')

app.use(express.json())
app.use(cors());

const axios = require('axios');

const configValues = require("./default.json");



app.post('/login', (req, res) => {
    const userId = req.body.username;
    const password = req.body.password;

    axios.get(`http://${configValues.api_host_accounts}:${configValues.PORT_IPC_API}/validateLogin?userid=${userId}&password=${password}`)
    .then((response) => {
            //console.log(response.data.status);
            if(response.data.status == true){
                const pwd = { name: userId};

                const accessToken= jwt.sign(pwd,process.env.ACCESS_TOKEN_SECRET)                
                res.send({"status":true,"link":`http://${configValues.api_host_frontend}:${configValues.PORT_FRONTEND}/home`,"token":accessToken});
            }else if(response.data.status == false){
                //console.log('Invalid credentials')
                res.send({'status':false});
            }
    }).catch(error =>{
        console.log(error);
    })
    
})

app.listen(configValues.PORT_AUTHENTICATION_MS, () => {
    console.log(`Authentication service running on portApiIpc ${configValues.PORT_AUTHENTICATION_MS}.`);
});