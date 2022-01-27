import React from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import '../../stylesheets/Register.scss';
import DetailInfoItem from "./DetailInfoItem";

const DetailInfo = () => {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()

    return(
        <div>
            <div id = "info">
                <h1>{t("detail_info_input1")}</h1>
                <h1>{t("detail_info_input2")}</h1>
            </div>
            <div className="black_line"></div>
            <DetailInfoItem essential = {t("essential")} gender={t("gender")} man={t("man")} woman={t("woman")}
            height = {t("height")} weight = {t("weight")} size = {t("size")} prefer_style = {t("prefer_style")} price = {t("price")}
            add_info = {t("add_myinfo_real")} selectable = {t("selectable")}/>
        </div>
    )
};

export default DetailInfo