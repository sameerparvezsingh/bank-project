const axios = require('axios');





const abc = () =>{
    axios.post("http://localhost:3000/getAccountsForUser", {
        "userid":"c1"
    }).then(response => {
        console.log(response.data);
    });
}

abc();