import '../../stylesheets/Login.scss';
import React from "react";
import {useTranslation} from "react-i18next";
import FindPwPhoneBox from "./FindPwPhoneBox";

function FindPw() {
    const {t, i18n} = useTranslation()
    return (
        <div className = "frame">
            <div id = "find_pw">
                <h1>{t("find_pw")}</h1>
                <FindPwPhoneBox enter_phone = {t("enter_phone")} enter_email = {t("enter_email")}
                                enter={t("enter")} pw_info_1 = {t("pw_info_1")}
                                pw_info_2 = {t("pw_info_2")} pw_info_3 = {t("pw_info_3")}
                                pw_info_4 = {t("pw_info_4")} pw_info_5 = {t("pw_info_5")}
                                find_with_phone = {t("find_with_phone")} find_with_email = {t("find_with_address")}/>
            </div>
        </div>
    )
}

export default FindPw