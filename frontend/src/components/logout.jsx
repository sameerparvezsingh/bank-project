import React from "react";
import { logout } from "../services/auth";

class Logout extends React.Component {
  componentDidMount() {
    logout();
    window.location.replace("/");
  }

  render() {
    return null;
  }
}

export default Logout;
