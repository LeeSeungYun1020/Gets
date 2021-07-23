import '../stylesheets/Register.scss';
import React from "react";
import RegisterBox from "./RegisterBox";
import {useTranslation} from "react-i18next";

function Register() {
    const {t, i18n} = useTranslation()
    return (
        <div>
            <h1 id="register_title">{t("register")}</h1>
            <div id = "register_line"></div>
            <RegisterBox name= {t("name")} email = {t("email")} password={t("password")}
                          phone = {t("phone")}
                          birthday = {t("birthday")} address = {t("address")}
                          input_email = {t("input_id")}
                          essential = {t("essential")} input_name = {t("enter_name")}
                          input_pw = {t("input_password_register")} input_pw_confirm = {t("confirm_password")}
                          enter_phone={t("enter_phone_register")}
                          register = {t("register_submit")}
                          agree_1 = {t("agree_1")} agree_2 = {t("agree_2")} agree_3 = {t("agree_3")}/>

        </div>
    )
};
export default Register