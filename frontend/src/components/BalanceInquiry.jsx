import React from "react";
import Joi from "joi";
import Input from "./common/input";
import http from "../services/httpService";
import { isLoggedIn } from "./../services/auth";
import DropDown from "../components/util";
import configValues from "../default.json"

class Account extends React.Component {
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
            `http://${configValues.api_host_accounts}:${configValues.PORT_BALANCE_INQUIRY}/balance_inquiry?accountNumber=${account.accountno.toUpperCase()}&userid=${
              payload.name
            }&access_token=${payload.access_token}`
          );
          this.setState({ user: data, invalidAccount: null });
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

  handleCallback = (childData) =>{
    const account = { ...this.state.account };
    account["accountno"] = childData;
    this.setState({ account });
  }

  render() {
    const { account, user, errors, invalidAccount } = this.state;
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
          <h6 className="text-danger mt-5">{invalidAccount}</h6>
        )}
        {user && !invalidAccount && (
          <table className="table table-bordered table-responsive mt-5">
            <tbody>
              <tr>
                <th>Account Number</th>
                <td>{user.accountnumber}</td>
              </tr>
              <tr>
                <th>Balance Amount</th>
                <td>
                  {user.currency} {user.balanceamt}
                </td>
              </tr>
              <tr>
                <th>Limit Amount</th>
                <td>
                  {user.currency} {user.limitamt}
                </td>
              </tr>
              <tr>
                <th>Lien Amount</th>
                <td>
                  {user.currency} {user.lienamount}
                </td>
              </tr>
              <tr>
                <th>Effective Balance</th>
                <td>
                  {user.currency} {user.effectivebal}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Account;
