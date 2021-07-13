import React from "react";
import HomeRecommendCard from "./HomeRecommendCard";
import style_example from "../images/home/style_example.jpg"
import HomeStyleInfoSlick from "./HomeStyleInfoSlick";
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
                <div id = "style_card_div">
                    <div id = "style_card">
                        <div>
                            <div>
                                <HomeRecommendCard image={style_example}/>
                                <HomeRecommendCard image={style_example}/>
                            </div>
                            <div>
                                <HomeRecommendCard image={style_example}/>
                                <HomeRecommendCard image={style_example}/>
                            </div>
                            <div>
                                <HomeRecommendCard image={style_example}/>
                                <HomeRecommendCard image={style_example}/>
                            </div>
                            <div>
                                <HomeRecommendCard image={style_example}/>
                                <HomeRecommendCard image={style_example}/>
                            </div>
                        </div>
                    </div>
                    <button className="view_more">{this.props.text}</button>
                </div>
                {/*<HomeStyleInfoSlick />*/}
            </>
        )
    }
}

export default HomeRecommendStyle