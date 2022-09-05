import React from "react";
import Joi from "joi";
import Input from "./common/input";
import http from "../services/httpService";
import { isLoggedIn } from "../services/auth";
import DropDown from "../components/util"
import configValues from "../default.json"

class FundTransfer extends React.Component {
  state = {
    account: {
      senderaccountnumber: "",
      receiveraccountnumber: "",
      amount: "",
      currency: "",
      description: "",
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
    senderaccountnumber: Joi.string()
      .min(3)
      .max(120)
      .required()
      .label("Sender Account Number"),
    receiveraccountnumber: Joi.string()
      .min(3)
      .max(120)
      .required()
      .label("Receiver Account Number"),
    amount: Joi.number().min(0).not(0).required().label("Amount"),
    currency: Joi.string().max(3).required().label("Currency"),
    description: Joi.string()
      .max(20)
      .optional("")
      .allow("")
      .label("Add Description"),
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

  handleReset = () => {
    const account = {
      senderaccountnumber: "",
      receiveraccountnumber: "",
      amount: "",
      currency: "",
      description: "",
    };
    this.setState({ account });
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
          const { data } = await http.post(
            `http://${configValues.api_host_payments}:${configValues.PORT_PAYMENTS_MICROSERVICE}/fund_transfer?access_token=${payload.access_token}`,
            {
              from_account: account.senderaccountnumber,
              to_account: account.receiveraccountnumber,
              amount: account.amount,
              currency: account.currency,
              description: account.description,
              userid: payload.name,
            }
          );
          this.setState({
            user: data,
            invalidAccount: null,
            ran: account.receiveraccountnumber,
            amt: account.amount,
            curr: account.currency,
            desc: account.description || "NA",
          });
          this.handleReset();
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
    account["senderaccountnumber"] = childData;
    this.setState({ account });
  }

  render() {
    const { account, user, errors, invalidAccount, ran, amt, curr, desc } =
      this.state;
    return (
      <div className="container mt-4">
        <form onSubmit={this.handleSubmit}>
          {/* <Input
            label="Sender Account Number"
            value={account.senderaccountnumber}
            onChange={this.handleChange}
            name="senderaccountnumber"
            error={errors.senderaccountnumber}
          /> */}
          <DropDown parentCallback = {this.handleCallback}/>
          <br />

          <Input
            label="Receiver Account Number"
            value={account.receiveraccountnumber}
            onChange={this.handleChange}
            name="receiveraccountnumber"
            error={errors.receiveraccountnumber}
          />

          <Input
            label="Enter Amount"
            value={account.amount}
            onChange={this.handleChange}
            name="amount"
            error={errors.amount}
          />

          <Input
            label="Currency"
            value={account.currency}
            onChange={this.handleChange}
            name="currency"
            error={errors.currency}
          />

          <Input
            label="Description"
            value={account.description}
            onChange={this.handleChange}
            name="description"
            error={errors.description}
          />

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
                <th>Status</th>
                <td>{user.status}</td>
              </tr>
              <tr>
                <th>Transaction Number</th>
                <td>{user.TransactionNumber}</td>
              </tr>
              <tr>
                <th>Receiver Account Number</th>
                <td>{ran}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>
                  {curr} {amt}
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{desc}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default FundTransfer;
