import HomeRecommendItem from "./HomeRecommendItem";

function HomeRecommend(props) {
    const chips = props.chips.map((item) =>
        <HomeRecommendItem key={item.text} image={item.image} text={item.text}/>
    )

    return (
        <div id="recommend">
            <h1>{props.title}</h1>
            <div className="style">
                {chips}
            </div>
        </div>
    )
}

export default HomeRecommend