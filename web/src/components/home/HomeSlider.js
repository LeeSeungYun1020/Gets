import React from "react";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import Slider from "react-slick";
import '../../stylesheets/Home.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import rightArrow from "../../images/article/right.webp";
import leftArrow from "../../images/article/left.webp";
import homeimg from "../../images/home/main_image.png";
import {useTranslation} from "react-i18next";
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
const HomeSlider = () => {
    const {t, i18n} = useTranslation();
    const settings = {
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }
    return (
        <div className="home-slider">
            <Slider {...settings} className="home-slider-real">
                <div className="home-slider-module">
                    <button className="view_more">{t("view_more")}</button>
                    <div className="hover-gradient" />
                    <img src={homeimg} />
                </div>
                <div className="home-slider-module">
                    <button className="view_more">{t("view_more")}</button>
                    <div className="hover-gradient" />
                    <img src={homeimg} />
                </div>
                <div className="home-slider-module">
                    <button className="view_more">{t("view_more")}</button>
                    <div className="hover-gradient" />
                    <img src={homeimg} />
                </div>
                <div className="home-slider-module">
                    <button className="view_more">{t("view_more")}</button>
                    <div className="hover-gradient" />
                    <img src={homeimg} />
                </div>
            </Slider>
        </div>
    )
}

export default HomeSlider;