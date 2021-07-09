import React from "react";

class HomeRecommendStyle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id = "recommend_style">
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>

            </div>
        )
    }
}

export default HomeRecommendStyle