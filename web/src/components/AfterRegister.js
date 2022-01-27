import '../stylesheets/Register.scss';
import React from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const AfterRegister = () => {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate();
    return (
        <div id = "after_register">
            <h1>{t("login_info")}</h1>
            <div id = "after_register_button">
                <button id = "addinfo" onClick = {() => navigate('/account/detailinfo')}>{t("add_myinfo")}</button>
                <button id = "notadd" onClick = {() => navigate('/')}>{t("not_add_myinfo")}</button>
            </div>
        </div>
    )
}

export default AfterRegister;