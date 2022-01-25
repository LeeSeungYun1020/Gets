import React from "react";
import {Route, Redirect, useNavigate} from "react-router-dom";
import isLogin from "./isLogin";
import link from "../link";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route
            {...rest}
            render={(props) => (isLogin() ? <Component {...props} /> : navigate(link.signin))}
        />
    );
};

export default PrivateRoute;