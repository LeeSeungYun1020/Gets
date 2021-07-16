import HomeStyleInfoSlick from "./HomeStyleInfoSlick";
import React, { Component } from "react";

class HomeStyleGuide extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id = "home_style_guide">
                <div class ="recommend_line"></div>
                <h1>{this.props.title}</h1>
                <HomeStyleInfoSlick />
            </div>
        )
    }
}

export default HomeStyleGuide;