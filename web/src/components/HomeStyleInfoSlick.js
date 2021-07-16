import React, { Component } from "react";
import Slider from "react-slick";
import {useTranslation} from 'react-i18next';
import casual from "../images/home/casual.webp"
import campus from "../images/home/campus.webp"
import street from "../images/home/street.webp"
import rock_chic from "../images/home/rock_chic.webp"
import amekaji from "../images/home/amekaji.webp"
import city_boy from "../images/home/city_boy.webp"
function HomeStyleInfoSlick() {
    const { t } = useTranslation();
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        swipeToSlide: true,
        arrows:true,
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1200, // 화면 사이즈 1200px
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    }
    return (
        <div id = "style_info">
            <Slider {...settings}>
                    <div class = "style_info_img">
                        <h2>{t("style_casual")}</h2>
                        <img src={casual} />
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_campus")}</h2>
                        <img src={campus} />
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_street")}</h2>
                        <img src={street} />
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_rock_chic")}</h2>
                        <img src={rock_chic} />
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_amekaji")}</h2>
                        <img src={amekaji} />
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_city_boy")}</h2>
                        <img src={city_boy} />
                    </div>
            </Slider>
        </div>
    )
}

export default HomeStyleInfoSlick;