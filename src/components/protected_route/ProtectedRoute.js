import React from "react";
import { Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  console.log(props.loggedIn);

  return (
    props.loggedIn ? <Component {...props}/> : <Redirect to="/"/>
  )
}

export default ProtectedRoute