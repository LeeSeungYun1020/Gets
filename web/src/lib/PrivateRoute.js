import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLogin from "./isLogin";
import link from "../link";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route
            {...rest}
            render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to={link.signin} />)}
        />
    );
};

export default PrivateRoute;