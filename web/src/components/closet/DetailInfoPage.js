import React, {useEffect, useState} from "react";
import DetailInfoCard from "./DetailInfoCard";
import {useTranslation} from "react-i18next";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const DetailInfoPage = () => {
    const {i18n, t} = useTranslation()
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(match.params)
    const id = params.id;
    return (
        <div id = "detail_page">
            <DetailInfoCard id={id}/>
        </div>)
}

export default DetailInfoPage;