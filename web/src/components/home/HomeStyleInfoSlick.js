import React from "react";
import Slider from "react-slick";
import {useTranslation} from 'react-i18next';
import casual from "../../images/home/casual.webp"
import campus from "../../images/home/campus.webp"
import street from "../../images/home/street.webp"
import rock_chic from "../../images/home/rock_chic.webp"
import amekaji from "../../images/home/amekaji.webp"
import city_boy from "../../images/home/city_boy.webp"
import lovely from "../../images/home/lovely.png"
import office from "../../images/home/office.png"
import minimal from "../../images/home/minimal.png"
import feminine from "../../images/home/feminine.png"
import sexy_glam from "../../images/home/sexy_glam.png"
import leftArrow from "../../images/home/elements-point-small-left.svg"
import rightArrow from "../../images/home/elements-point-small-right.svg"
import {useHistory} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
        >
            <img src = {rightArrow} />
        </div>
    );
}

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style}}
            onClick={onClick}
        >
            <img src = {leftArrow} />
        </div>
    );
}
const HomeStyleInfoSlick = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        draggable: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const onArticleClick = (e) => {
        history.push(`/article/${e}`)
    }
    return (
        <div id ="style_info">
            <Slider {...settings}>
                    <div className = "style_info_img" onClick={() => onArticleClick("casual")} >
                        <h2>{t("casual")}</h2>
                        <img src={casual}/>
                    </div>
                    <div className = "style_info_img" onClick={() => onArticleClick("campus")}>
                        <h2>{t("campus")}</h2>
                        <img src={campus}/>
                    </div>
                    <div className = "style_info_img" onClick={() => onArticleClick("street")}>
                        <h2>{t("street")}</h2>
                        <img src={street}/>
                    </div>
                    <div className = "style_info_img" onClick={() => onArticleClick("rock_chic")}>
                        <h2>{t("rock_chic")}</h2>
                        <img src={rock_chic}/>
                    </div>
                    <div className = "style_info_img" onClick={() => onArticleClick("amekaji")}>
                        <h2>{t("amekaji")}</h2>
                        <img src={amekaji}/>
                    </div>
                    <div className = "style_info_img" onClick={() => onArticleClick("city_boy")}>
                        <h2>{t("city_boy")}</h2>
                        <img src={city_boy}/>
                    </div>
                    <div className="style_info_img" onClick={() => onArticleClick("office")}>
                        <h2>{t("office")}</h2>
                        <img src={office}/>
                    </div>
                    <div className="style_info_img" onClick={() => onArticleClick("sexy_glam")}>
                        <h2>{t("sexy_glam")}</h2>
                        <img src={sexy_glam}/>
                    </div>
                    <div className="style_info_img" onClick={() => onArticleClick("feminine")}>
                        <h2>{t("feminine")}</h2>
                        <img src={feminine}/>
                    </div>
                    <div className="style_info_img" onClick={() => onArticleClick("lovely")}>
                        <h2>{t("lovely")}</h2>
                        <img src={lovely}/>
                    </div>
                    <div className="style_info_img" onClick={() => onArticleClick("minimal")}>
                        <h2>{t("minimal")}</h2>
                        <img src={minimal}/>
                    </div>
            </Slider>
        </div>
    )
}

export default HomeStyleInfoSlick;