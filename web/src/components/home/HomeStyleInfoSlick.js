import React from "react";
import Slider from "react-slick";
import {useTranslation} from 'react-i18next';
import casual from "../../images/home/casual.webp"
import campus from "../../images/home/campus.webp"
import street from "../../images/home/street.webp"
import rock_chic from "../../images/home/rock_chic.webp"
import amekaji from "../../images/home/amekaji.webp"
import city_boy from "../../images/home/city_boy.webp"
import leftArrow from "../../images/home/elements-point-small-left.svg"
import rightArrow from "../../images/home/elements-point-small-right.svg"

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
    const { t } = useTranslation();
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
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
    return (
        <div id ="style_info">
            <Slider {...settings}>
                    <div className = "style_info_img">
                        <h2>{t("style_casual")}</h2>
                        <img src={casual} />
                    </div>
                    <div className = "style_info_img">
                        <h2>{t("style_campus")}</h2>
                        <img src={campus} />
                    </div>
                    <div className = "style_info_img">
                        <h2>{t("style_street")}</h2>
                        <img src={street} />
                    </div>
                    <div className = "style_info_img">
                        <h2>{t("style_rock_chic")}</h2>
                        <img src={rock_chic} />
                    </div>
                    <div className = "style_info_img">
                        <h2>{t("style_amekaji")}</h2>
                        <img src={amekaji} />
                    </div>
                    <div className = "style_info_img">
                        <h2>{t("style_city_boy")}</h2>
                        <img src={city_boy} />
                    </div>
                    <div className="style_info_img">
                        <h2>{t("style_office")}</h2>
                        <img src={casual}/>
                    </div>
                    <div className="style_info_img">
                        <h2>{t("style_sexy_glam")}</h2>
                        <img src={casual}/>
                    </div>
                    <div className="style_info_img">
                        <h2>{t("style_feminine")}</h2>
                        <img src={casual}/>
                    </div>
                    <div className="style_info_img">
                        <h2>{t("style_lovely")}</h2>
                        <img src={casual}/>
                    </div>
                    <div className="style_info_img">
                        <h2>{t("style_minimal")}</h2>
                        <img src={casual}/>
                    </div>
            </Slider>
        </div>
    )
}

export default HomeStyleInfoSlick;