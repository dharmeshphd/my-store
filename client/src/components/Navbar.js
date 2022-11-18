import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {

  const cartLink =(
    <li className="nav-item active">
        <Link className="nav-link" to="cart">
          Cart <span className="sr-only">(current)</span>
        </Link>
      </li>
  )
  const adminLinks = (
    <>
      <li className="nav-item active">
        <Link className="nav-link" to="users">
          Users <span className="sr-only">(current)</span>
        </Link>
      </li>
    </>
  );

  const sellerLinks = (
    <>
      <li className="nav-item active">
        <Link className="nav-link" to="products">
          Products <span className="sr-only">(current)</span>
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li className="nav-item active">
        <Link className="nav-link" onClick={logout}>
          Logout <span className="sr-only">(current)</span>
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item active">
        <Link className="nav-link" to="/login">
          Login <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/register">
          Register <span className="sr-only">(current)</span>
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {user.permissions !== null && user.permissions.admin
              ? adminLinks
              : null}
            {user.permissions !== null && user.permissions.seller
              ? sellerLinks
              : null}
            {!loading && !user.permissions.seller && !user.permissions.admin && isAuthenticated ? cartLink:null}
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
