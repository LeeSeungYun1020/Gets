function HomeRecommendItem(props) {
    return (
        <div>
            <img className="style_chip" src={props.image}/>
            <div className="style_text">{props.text}</div>
        </div>
    )
}

export default HomeRecommendItem