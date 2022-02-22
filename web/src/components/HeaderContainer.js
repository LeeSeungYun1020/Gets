import React from "react";
import Store from "../Store/store";
import HeaderMenu from "./HeaderMenu";

const HeaderContainer = () => {
    return (
        <Store.Consumer>
            {store => (
                <HeaderMenu login={store.login} setLogin={store.setLogin}/>
            )}
        </Store.Consumer>
    )
}

export default HeaderContainer;