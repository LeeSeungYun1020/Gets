import HomeStyleInfoSlick from "./HomeStyleInfoSlick";
import React from "react";

class HomeStyleGuide extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="home_style_guide">
                <h1>{this.props.title}</h1>
                <HomeStyleInfoSlick/>
            </div>
        )
    }
}

export default HomeStyleGuide;