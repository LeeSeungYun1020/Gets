import React from "react";
import DetailInfoCard from "./DetailInfoCard";
import {useTranslation} from "react-i18next";
import { withRouter } from "react-router-dom";

const DetailInfoPage = ({match}) => {
    const {i18n, t} = useTranslation()
    console.log(match.params)
    const id = match.params.id;
    console.log(id)
    return (
        <div id = "detail_page">
            <DetailInfoCard id = {id}/>
        </div>)
}

export default withRouter(DetailInfoPage);