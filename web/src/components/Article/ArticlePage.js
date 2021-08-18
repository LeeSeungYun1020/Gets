import '../../stylesheets/Article.scss';
import React from "react";
import { withRouter } from "react-router-dom"
import {useTranslation} from "react-i18next";
import DetailArticle from "./DetailArticle";
const ArticlePage = ({match}) => {
    const {i18n, t} = useTranslation()
    const what = match.params.id;
    return (
        <div id = "article-page">
            <DetailArticle what = {what} />
        </div>
    )
}
export default withRouter(ArticlePage)