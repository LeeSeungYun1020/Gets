import '../../stylesheets/Login.scss';
import React from "react";
import {useTranslation} from "react-i18next";
import link from "../../link";
import {Link} from "react-router-dom";
import LoginContainer from "./LoginContainer";

function SignIn() {
    const {t, i18n} = useTranslation()
    return (
        <div className = "frame">
            <div id = "login_state">
                <h1>{t("login_info")}</h1>
            </div>
            <LoginContainer />
            <div id = "find_or_register">
                <p><Link to ={link.findid}>{t("find_id")}</Link></p>
                <div className = "find_line"></div>
                <p><Link to = {link.findpw}>{t("find_pw")}</Link></p>
                <div className="find_line"></div>
                <p><Link to ={link.register}>{t("register")}</Link></p>
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