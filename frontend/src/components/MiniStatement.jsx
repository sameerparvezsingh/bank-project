import React from "react";
import Joi from "joi";
import Input from "./common/input";
import { Button } from "reactstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import http from "../services/httpService";
import { isLoggedIn } from "./../services/auth";
import DropDown from "../components/util"
import configValues from "../default.json"

class MiniStatement extends React.Component {
  state = {
    account: {
      // userid: "",
      accountno: "",
    },

    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  schema = Joi.object({
    // userid: Joi.string().min(1).max(120).required().label("Enter User Id:"),
    accountno: Joi.string()
      .min(3)
      .max(120)
      .required()
      .label("Enter Account number:"),
  });

  validateForm = () => {
    const { error } = this.schema.validate(this.state.account, {
      abortEarly: false,
    });
    let errors = null;
    if (error) {
      errors = {};
      for (let i of error.details) {
        errors[i.path[0]] = i.message;
      }
    }
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // data validation
    const errors = this.validateForm() || {};

    if (Object.keys(errors).length === 0) {
      //api calls
      const { account } = this.state;
      const payload = isLoggedIn();
      try {
        if (payload) {
          const { data } = await http.get(
            `http://${configValues.api_host_payments}:${configValues.PORT_PAYMENTS_MICROSERVICE}/Mini_Statement?Account_Number=${account.accountno.toUpperCase()}&UserID=${
              payload.name
            }&access_token=${payload.access_token}`
          );
          this.setState({
            user: data.transaction,
            user2: data.Total_Balance,
            invalidAccount: null,
          });
        } else {
          this.setState({
            invalidAccount: "Login to Continue / Invalid Token",
          });
        }
      } catch (ex) {
        if (ex.response)
          this.setState({ invalidAccount: ex.response.data.error });
      }
    }

    this.setState({ errors });
  };

  pdfGenerate = () => {
    var doc = new jsPDF("landscape", "px", "a4", "false");
    autoTable(doc, { html: "#StatementTable" });
    doc.save("MiniStatements.pdf");
  };

  handleCallback = (childData) =>{
    const account = { ...this.state.account };
    account["accountno"] = childData;
    this.setState({ account });
  }

  render() {
    const { account, user, user2, errors, invalidAccount } = this.state;
    return (
      <div className="container mt-4">
        <form onSubmit={this.handleSubmit}>
          {/* <Input
            label="User Id"
            value={account.userid}
            onChange={this.handleChange}
            name="userid"
            error={errors.userid}
          /> */}
          <DropDown parentCallback = {this.handleCallback}/>
          <br />
          <button
            disabled={this.validateForm()}
            className="btn btn-primary btn-sm"
          >
            Submit
          </button>
        </form>

        {invalidAccount && (
          <h6 className="text-danger mt-3">{invalidAccount}</h6>
        )}
        {user && !invalidAccount && (
          <div className="container mt-3">
            <h6>Total Available Balance: {user2}</h6>
            <table
              id="StatementTable"
              className="table table-bordered table-responsive mt-4"
            >
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Transaction Type</th>
                  <th>Transaction Amount</th>
                  <th>Associated Account Number</th>
                  <th>Description</th>
                  <th>Transaction Date and Time</th>
                </tr>
              </thead>
              <tbody>
                {user.map((t) => (
                  <tr key={t.Trans_id}>
                    <td>{t.Trans_id}</td>
                    <td>{t.Trans_type}</td>
                    <td>{t.Trans_Amount}</td>
                    <td>{t.Associate_Acc_Number}</td>
                    <td>{t.Trans_Desc}</td>
                    <td>{((t.Date.toString()).replace("T"," ")).substring(0,19)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
                <br />
                <Button onClick={this.pdfGenerate}>Download PDF</Button>
            </div>
          </div>
        )}
        
      </div>
    );
  }
}

export default MiniStatement;
