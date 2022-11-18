import React, { useState, useEffect, Profiler } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import axios from "axios";
import { getUsers } from "../redux/actions/users";

function Users({ auth, usersList, getUsers }) {
  let _userList = usersList;

  const usersActivation = async (userId, isActive) =>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ userId, isActive});
      let res = await axios.post('/api/activation', body, config)
      getUsers()
      alert("User active status changed on server")

    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg));
      }
    }
  }

  const usersPermissions = async (userId, permissions) =>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ userId, permissions});
      let res = await axios.post('/api/permissions', body, config)
      getUsers()
      alert("User permission changed on server")
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => alert(error.msg));
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container">
      <h1>List of users</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Name of User</th>
            <th scope="col">Email</th>
            <th scope="col">Seller</th>
            <th scope="col">Buyer</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          {_userList.map((u, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td scope="row">{u.name}</td>
              <td scope="row">{u.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={u.permissions.seller}
                  onChange={(e) => {
                    let permissions = _userList[index]['permissions']
                    permissions['seller'] = !permissions['seller']
                    usersPermissions(_userList[index]['_id'], permissions)
                  }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={u.permissions.buyer}
                  onChange={(e) => {
                    let permissions = _userList[index]['permissions']
                    permissions['buyer'] = !permissions['buyer']
                    usersPermissions(_userList[index]['_id'], permissions)
                  }}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={u.isActive}
                  onChange={(e) => {
                    let active = _userList[index].isActive;
                    usersActivation(_userList[index]['_id'], !active)
                    // console.log(active);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Users.protoTypes = {
  usersList: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  usersList: state.users.users,
});

export default connect(mapStateToProps, { getUsers })(Users);
