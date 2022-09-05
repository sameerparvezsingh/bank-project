import React from "react";

const Card = ({ title, body, link }) => {
  return (
    <a className="text-decoration-none text-dark" href={link}>
      <div
        className="card p-5 bg-secondary bg-opacity-10"
        style={{ width: "18rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    </a>
  );
};

export default Card;
