import React from "react";
import Card from "./common/card";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Capstone Product</h1>
      <div className="d-flex gap-5 justify-content-center mt-5">
        <Card
          title="Balance Inquiry"
          link="/balanceinquiry"
          body="Check your Balance here"
        />
        <Card
          title="Fund Transfer"
          link="/fundtransfer"
          body="Transfer your funds here"
        />
        <Card
          title="Mini Statement"
          link="/ministatement"
          body="View your Transaction History"
        />
      </div>
    </div>
  );
};

export default Home;
