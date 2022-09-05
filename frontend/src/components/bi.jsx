import React, { useState } from "react";
import axios from "axios";

export default function BalanceInquiryy() {
  const [userid, setuserid] = useState("");
  const [accountNumber, setaccountNumber] = useState("");

  const [posts, setPosts] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();

    // const res= await axios.get('http://localhost:3000/Mini_Statement?Account_Number=SB501&UserID=c1&access_token=8a702c3bfc0e79b36b382d33992a651e');
    // http://localhost:3000/balance_inquiry?accountNumber=SB501&userid=c1&access_token="8a702c3bfc0e79b36b382d33992a651e"
    const res = await axios.post(
      "http://localhost:3000/balance_inquiry?access_token=8a702c3bfc0e79b36b382d33992a651e",
      {
        userid: userid,
        accountNumber: accountNumber,
      }
    );
    setPosts(res.data);
  };
  console.log(posts);

  const renderedPosts = Object.values(posts).map((post) => {
    return <div>{post}</div>;
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Fill the fields</label>
          <input
            className="form-control"
            value={userid}
            onChange={(e) => setuserid(e.target.value)}
          />
          <input
            className="form-control"
            value={accountNumber}
            onChange={(e) => setaccountNumber(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
      <div className="d-flex flex-row flex-wrap justify justify-content-between">
        {renderedPosts}
      </div>
    </div>
  );
}
