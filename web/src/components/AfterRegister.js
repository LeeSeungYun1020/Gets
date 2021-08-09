import '../stylesheets/Register.scss';
import React from "react";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const AfterRegister = () => {
    const {t, i18n} = useTranslation()
    const history = useHistory();
    return (
        <div id = "after_register">
            <h1>{t("login_info")}</h1>
            <div id = "after_register_button">
                <button id = "addinfo" onClick = {() => history.push('/account/detailinfo')}>{t("add_myinfo")}</button>
                <button id = "notadd" onClick = {() => history.push('/')}>{t("not_add_myinfo")}</button>
            </div>
        </div>
    )
}

export default AfterRegister;