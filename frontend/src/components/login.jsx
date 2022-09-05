import React, { useState } from "react";
import axios from "axios";
import configValues from "../default.json"

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState({});
  const [flag, setFlag] = useState(true);

  const onSubmit = async (event) => {
    event.preventDefault();

    
    const res = await axios.post(`http://${configValues.api_host_authentication}:${configValues.PORT_AUTHENTICATION_MS}/login`, {
      username: username,
      password: password,
    });
    //console.log(res.data);
    if (res.data.status === true) {
      window.localStorage.setItem("token", res.data.token);
      window.location.href = res.data.link;

      setPosts(res.data.link);
    } else if (res.data.status === false) {
      window.localStorage.setItem("token", "empty");
      //console.log("Invalid Credentials");
      setFlag(res.data.status);
    }
  };
  
  return (
    <div className="container mt-5">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Userid</label>
          <input
            required
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="mt-3">Password</label>

          <input
            required
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />

        <button className="btn btn-primary">Submit</button>
      </form>
      <br />
      {flag == false && (<div className="d-flex flex-row flex-wrap justify justify-content-between">
      <div className="alert alert-danger" role="alert">
        Invalid Credentials
      </div>
      </div>)}
    </div>
  );
}
