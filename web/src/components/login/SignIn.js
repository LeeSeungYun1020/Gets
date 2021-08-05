import '../../stylesheets/Login.scss';
import React from "react";
import SignInBox from "./SignInBox";
import {useTranslation} from "react-i18next";
import link from "../../link";

function SignIn() {
    const {t, i18n} = useTranslation()

    return (
        <div className = "frame">
            <div id = "login_state">
                <h1>{t("login_info")}</h1>
            </div>
            <SignInBox login = {t("login")} input_id = {t("input_id")} input_pw = {t("input_password")}/>
            <div id = "find_or_register">
                <p><a href={link.findid}>{t("find_id")}</a></p>
                <div className = "find_line"></div>
                <p><a href = {link.findpw}>{t("find_pw")}</a></p>
                <div className="find_line"></div>
                <p><a href ={link.register}>{t("register")}</a></p>
            </div>
            {/*<div id = "kakao_info">*/}
            {/*    <div class = "kakao_line"></div>*/}
            {/*    <p>{t("simple_register")}</p>*/}
            {/*    <div className="kakao_line"></div>*/}
            {/*</div>*/}
        </div>
    )
}

export default SignIn