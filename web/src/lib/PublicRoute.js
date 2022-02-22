import React from "react";
import {Redirect, Route} from "react-router-dom";
import isLogin from "./isLogin";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => (isLogin() && restricted ? <Redirect to="/"/> : <Component {...props} />)}
        />
    );
};

export default PublicRoute;