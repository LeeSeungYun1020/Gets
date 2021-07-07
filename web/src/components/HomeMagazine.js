import mainImage from "../images/home/main_image.png"
import HomeArticle from "./HomeArticle";

function HomeMagazine(props) {
    return (
        <div className="magazine">
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    < HomeArticle image={mainImage}/>
                    < HomeArticle image={mainImage}/>
                    < HomeArticle image={mainImage}/>
                </div>
                <div className="swiper-pagination"/>
                <div className="swiper-button-prev"/>
                <div className="swiper-button-next"/>
            </div>
        </div>
    )
}

export default HomeMagazine