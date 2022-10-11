import React from "react";
import { Redirect } from "react-router-dom";
import Loader from "../loader_spin/Loader";

function ProtectedRoute({ component: Component, ...props }) {

  return (
    props.tokenChecked ? <Component {...props}/> : <Loader/>
  )
}

export default ProtectedRoute