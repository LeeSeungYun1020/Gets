import React from "react";
import {Route, Redirect, useHistory} from "react-router-dom";
import isLogin from "./isLogin";
import link from "../link";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route
            {...rest}
            render={(props) => (isLogin() ? <Component {...props} /> : history.push(link.signin))}
        />
    );
};

export default PrivateRoute;