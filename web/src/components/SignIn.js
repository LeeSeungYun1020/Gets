import '../stylesheets/Login.scss';
import React from "react";
import SignInBox from "./SignInBox";
import {useTranslation} from "react-i18next";

function SignIn() {
    const {t, i18n} = useTranslation()

    return (
        <div>
            <div id = "login_state">
                <div id = "align_login">
                    <h1>{t("login_info_1")}</h1>
                    <h1>{t("login_info_2")}</h1>
                    <h1>{t("login_info_3")}</h1>
                </div>
            </div>
            <SignInBox login = {t("login")} input_id = {t("input_id")} input_pw = {t("input_password")}/>
            <div id = "find_or_register">
                <p><a href = '#'>{t("find_id")}</a></p>
                <div class = "find_line"></div>
                <p><a href = '#'>{t("find_pw")}</a></p>
                <div className="find_line"></div>
                <p><a href = '#'>{t("register")}</a></p>
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