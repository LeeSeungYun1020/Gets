import '../../stylesheets/Article.scss';
import React from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import DetailArticle from "./DetailArticle";

const ArticlePage = ({match}) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {i18n, t} = useTranslation()
    const style = ['casual', 'campus', 'office', 'rock-chic', 'street', 'amekaji', 'city-boy', 'feminine', 'lovely', 'sexy-glam', 'minimal']
    const what = match.params.id || "casual"; // undefined면 케쥬얼로 이동이동
    if(style.indexOf(what) === -1) { // 스타일 없는걸 선택하면 그전으로 이동시켜버림
        navigate.goBack()
    }
    return (
        <div id = "article-page">
            <DetailArticle what = {what} />
        </div>
    )
}
export default ArticlePage