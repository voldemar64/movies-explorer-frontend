import React from "react";
import Loader from "../loader_spin/Loader";

function ProtectedRoute({ component: Component, ...props }) {

  return (
    props.loggedIn ? <Component {...props}/> : <Loader/>
  )
}

export default ProtectedRoute