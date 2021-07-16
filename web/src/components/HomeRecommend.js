import HomeRecommendItem from "./HomeRecommendItem";
import React from "react";

class HomeRecommend extends React.Component {
    constructor(props) {
        super(props);
        let isSelected = []
        for (let item of this.props.chips) {
            isSelected[item.text] = item.selected
        }
        this.state = {selected: isSelected}
    }

    styleClick(key) {
        let isSelected = []
        for (let i = 0; i < this.props.chips.length; i++) {
            if (this.props.chips[i].text === key) {
                this.props.chips[i].selected = !this.props.chips[i].selected
            }
            isSelected[this.props.chips[i].text] = this.props.chips[i].selected
        }
        this.setState({
            selected: isSelected
        })
    }

    render() {
        const chips = this.props.chips.map((item) =>
            <div key={item.text} onClick={this.styleClick.bind(this, item.text)}>
                <HomeRecommendItem image={item.image} text={item.text} selected={item.selected}/>
            </div>
        )
        return (
            <div id="recommend">
                <h1>{this.props.title}</h1>
                <div className="style">
                    {chips}
                </div>
                <button>{this.props.text}</button>
                <div class="recommend_line"></div>
            </div>
        )
    }


}

export default HomeRecommend