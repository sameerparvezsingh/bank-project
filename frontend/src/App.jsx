import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Account from "./components/BalanceInquiry";
//import BalanceInquiryy from "./components/bi";
import FundTransfer from "./components/fundTransfer";
import MiniStatement from "./components/MiniStatement";
import Home from "./components/home";
import Logout from "./components/logout";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/home" component={Home} />
          <Route path="/balanceinquiry" component={Account} />
          <Route path="/fundTransfer" component={FundTransfer} />
          <Route path="/ministatement" component={MiniStatement} />
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    );
  }
}

export default App;
