import { StringToNumStyle } from "../Data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import DetailArticleList from "./DetailArticleList";
import ArticleSlick from "./ArticleSlick";
const DetailArticle = ({what}) => {
    const {t, i18n} = useTranslation()
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageID, setImageID] = useState([]);
    let tag = [];
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const id = `${StringToNumStyle[what]}`;
                const response = await axios.get(`http://localhost:3000/article/${id}`)
                setArticle(response.data)
                try {
                    const response_2 = await axios.post(`http://localhost:3000/article/image/${id}`)
                    setImageID(response_2.data)
                }
                catch(e){
                    console.log(e)
                }
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[what])
    //대기중일때
    if(loading) {
        return <div><h3>로딩중 ...</h3></div>
    }
    //아직 article 설정 안됐을때
    if(!article) {
        return null;
    }
    else {
        tag = `${article.tag}`.split(',')
    }
    return (
        <div className = "article-div">
            <div className = "article-info">
                <div className="just-div">
                    <h1 className="article-name">{t(`kr_${article.name}`)}</h1>
                    <h1 className="english-article-name">{t(`${article.name}`)}</h1>
                    <div style={{marginTop: 50}}>{article.description.split("\n").map((item, index) => <p className = {`article_${article.name}`}id={`${article.name}-${index}`}>{item}</p>)}</div>
                    <div className = "article-tag">
                        {tag.map(item => <div className="article-each-tag">{item}</div>)}
                    </div>
                </div>
            </div>
            <div id = "article-slick-background"><ArticleSlick imageID = {imageID}/></div>
            <div id="just-slick-background" />
            <DetailArticleList id={article.id}/>
        </div>
    )
}

export default DetailArticle