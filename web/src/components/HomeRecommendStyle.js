import React from "react";
import HomeRecommendCard from "./HomeRecommendCard";
import style_example from "../images/home/style_example.jpg"
class HomeRecommendStyle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <>
                <div id = "recommend_style">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.content}</p>
                </div>
                <div>
                    <div id = "style_card">
                        <div>
                            <HomeRecommendCard image={style_example}/>
                            <HomeRecommendCard image={style_example}/>
                            <HomeRecommendCard image={style_example}/>
                            <HomeRecommendCard image={style_example}/>
                        </div>
                        <div>
                            <HomeRecommendCard image={style_example}/>
                            <HomeRecommendCard image={style_example}/>
                            <HomeRecommendCard image={style_example}/>
                            <HomeRecommendCard image={style_example}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default HomeRecommendStyle