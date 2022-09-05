import React from "react";

const Input = ({ label, type = "text", onChange, value, name, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor="accountid" className="form-label">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        className="form-control"
        autoComplete="off"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
