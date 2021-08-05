function HomeArticle(props) {
    return (
        <div className="swiper-slide">
            <img className="main_article" id="main" src={props.image}/>
        </div>
    )
}

export default HomeArticle