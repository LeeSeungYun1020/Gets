import React from "react";
import Store from "../../Store/store";
import SignInBox from "./SignInBox";

const LoginContainer = () => {
    return (
        <Store.Consumer>
            {store => (
                <SignInBox login={store.login} setLogin={store.setLogin}/>
            )}
        </Store.Consumer>
    )
}

export default LoginContainer;