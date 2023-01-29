import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import leftArrow from "../../images/article/left.webp";
import rightArrow from "../../images/article/right.webp";
import link from "../../link";

const NextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style}}
            onClick={onClick}
        >
            <img src={rightArrow}/>
        </div>
    );
}

const PrevArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style}}
            onClick={onClick}
        >
            <img src={leftArrow}/>
        </div>
    );
}
const ArticleSlick = ({imageID}) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
    };
    return (
        <div className="article-slider">
            <Slider {...settings} className="article-slider-real">
                {imageID.map((item) => (
                    <div className="slider-module" style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={`${link.base}/article/image/${item.imageID}`}
                             style={{marginLeft: 15, marginRight: 15}}/>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ArticleSlick