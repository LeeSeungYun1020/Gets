import {StringToNumStyle} from "../Data";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import DetailArticleList from "./DetailArticleList";
import ArticleSlick from "./ArticleSlick";
import casual from "../../images/article/casual.png";
import campus from "../../images/article/campus.png";
import amekaji from "../../images/article/amekaji.png";
import city_boy from "../../images/article/city_boy.png";
import feminine from "../../images/article/feminine.png";
import lovely from "../../images/article/lovely.png";
import minimal from "../../images/article/minimal.png";
import office from "../../images/article/office.png";
import rock_chic from "../../images/article/rock_chic.png";
import sexy_glam from "../../images/article/sexy_glam.png";
import street from "../../images/article/street.png";
import link from "../../link";

const DetailArticle = ({what}) => {
    const {t, i18n} = useTranslation()
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageID, setImageID] = useState([]);
    let tag = [];
    let styleImage;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const id = `${StringToNumStyle[what]}`;
                const response = await axios.get(`${link.base}/article/${id}`)
                setArticle(response.data)
                try {
                    // console.log(id)
                    const response_2 = await axios.post(`${link.base}/article/image/${id}`)
                    setImageID(response_2.data)
                } catch (e) {
                    console.log(e)
                }
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, [what])
    //대기중일때
    if (loading) {
        return <div><h3>로딩중 ...</h3></div>
    }
    //아직 article 설정 안됐을때
    if (!article) {
        return null;
    } else {
        tag = `${article.tag}`.split(',')
        switch (article.name) {
            case "minimal":
                styleImage = minimal
                break;
            case "casual":
                styleImage = casual
                break;
            case "campus":
                styleImage = campus
                break;
            case "amekaji":
                styleImage = amekaji
                break;
            case "city-boy":
                styleImage = city_boy
                break;
            case "feminine":
                styleImage = feminine
                break;
            case "rock-chic":
                styleImage = rock_chic
                break;
            case "lovely":
                styleImage = lovely
                break;
            case "office":
                styleImage = office
                break;
            case "sexy-glam":
                styleImage = sexy_glam
                break;
            case "street":
                styleImage = street
                break;
            default :
                styleImage = casual
        }
    }
    return (<div className="article-div">
            <div className="article-info">
                <div className="just-div">
                    <div className="just-div2">
                        {console.log(article)}
                        <h1 className="article-name">{t(`kr_${article.name}`)}</h1>
                        <h1 className="english-article-name">{t(`${article.name}`)}</h1>
                        <div style={{marginTop: 50}}>{article.description.split("\n").map((item, index) => <p
                            className={`article_${article.name}`} id={`${article.name}-${index}`}>{item}</p>)}</div>
                        <div className="article-tag">
                            {tag.map(item => <div className="article-each-tag">{item}</div>)}
                        </div>
                    </div>
                    <div className="article-img">
                        <img src={styleImage}/>
                    </div>
                </div>
            </div>
            <div id="article-slick-background"><ArticleSlick imageID={imageID}/></div>
            <div id="just-slick-background"/>
            <DetailArticleList id={article.id}/>
        </div>)
}

export default DetailArticle