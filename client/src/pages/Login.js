import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {connect} from 'react-redux'
import { PropTypes } from "prop-types";
import {login} from '../redux/actions/auth'

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    login({email, password})
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if(isAuthenticated){
    return <Navigate to='/' />
  }

  return (
    <section className="container">
      <h1 className="h1 mt-4 mb-2 text-success">Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            className="form-control"
            id="password"
            required
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="mt-4">
        <Link to="/register">Click here to create new account</Link>
      </p>
     <hr/>
      <p className="mt-4">
        <a href="https://github.com/dharmeshphd/my-store/" className="text-secondary">Click here to goto github for further information</a>
      </p>
    </section>
  );
};

Login.protoTypes = {
  login : PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
