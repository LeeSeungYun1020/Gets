import React from "react";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ClosetCategory = () => {
    const {t, i18n} = useTranslation()
    return (
        <div id = "closet_category">
            <NavLink activeClassName="active" exact to="/closet"><NavLink activeClassName="active" to="/closet/coordination"><h1>{t("coordination")}</h1></NavLink></NavLink>
            <NavLink activeClassName="active" to="/closet/product"><h1>{t("product")}</h1></NavLink>
        </div>
        )
}

export default ClosetCategory;