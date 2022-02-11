import '../../stylesheets/Login.scss';
import React from "react";
import FindIdBox from "./FindIdBox";
import {useTranslation} from "react-i18next";

function FindId() {
    const {t, i18n} = useTranslation()
    return (
        <div className = "frame">
            <div id = "find_id">
                <h1>{t("find_id")}</h1>
                <FindIdBox name={t("name")} enter_phone = {t("enter_phone")} enter={t("enter")} />
            </div>
        </div>
    )
}

export default FindId