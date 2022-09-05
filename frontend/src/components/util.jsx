import React from "react";
import axios from "axios";
import { isLoggedIn } from "./../services/auth";
import configValues from "../default.json"


class DropDown extends React.Component {
    constructor(props){
        super(props)
        this.state={
            values: [],
            accountnumber : ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
   
    onTrigger = () => {
        this.props.parentCallback("Welcome to GFG");
      };
    componentDidMount() {
       var payload =  isLoggedIn();
       if(payload == null){
           window.location.href=`http://${configValues.api_host_frontend}:${configValues.PORT_FRONTEND}/login`
       }else if(payload != null){
           axios.post(`http://${configValues.api_host_accounts}:${configValues.PORT_IPC_API}/getAccountsForUser`,{
            userid: payload.name
        })
        .then(function(res) {
            console.log(res.data)
            return res.data;
        }).then((json)=> {
            this.setState({
               values: json
            })
        });
       }
       
    }
    
    handleChange(e) {
        
        this.state.accountnumber=e.target.value;
    
        console.log(e.target.value);
        console.log(this.state)
        //console.log(this.state.accountnumber);
        this.props.parentCallback(e.target.value);
      }    
    render(){
        return <div className="drop-down">
            <div className="d-flex flex-row flex-wrap justify justify-content-between">
                <select class="form-select" aria-label="Default select example" onChange={this.handleChange} >
                    <option>Select Account Number</option> 
                    {
                        this.state.values.map((obj) => {
                            return <option value={obj.accountnumber}>{obj.accountnumber}</option>
                        })
                   }   
                </select>
           </div>
            </div>;
    }
}
export default DropDown;
