import React, { Component } from "react";
import Slider from "react-slick";
import {useTranslation} from 'react-i18next';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "none" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "none" }}
            onClick={onClick}
        />
    );
}
function HomeStyleInfoSlick() {
    const { t } = useTranslation();
    const settings = {
        infinte: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        swipe:false, // 마우스로 드레그  비활성화
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
        <div>
            <Slider {...settings}>
                {/*<div id="style_info">*/}
                    <div class = "style_info_img">
                        <h2>{t("style_casual")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_campus")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_street")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_rock_chic")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_amekaji")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_city_boy")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div className="style_info_img" />
                    <div class = "style_info_img">
                        <h2>{t("style_office")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_sexy_glam")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_feminine")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_lovely")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>
                    <div class = "style_info_img">
                        <h2>{t("style_minimal")}</h2>
                        <button className="view_more">{t("view_more")}</button>
                    </div>

                {/*</div>*/}
            </Slider>
        </div>
    )
}

export default HomeStyleInfoSlick;