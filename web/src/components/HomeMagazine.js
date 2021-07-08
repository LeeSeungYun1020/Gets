import HomeArticle from "./HomeArticle";
import React from "react";

class HomeMagazine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: 0};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            this.props.interval ?? 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            index: ((this.state.index + 1) % this.props.list.length)
        });
    }

    render() {
        const articleList = this.props.list.map((item) =>
            < HomeArticle image={item}/>
        )

        return (
            <div className="magazine">
                <div className="magazine_container">
                    < HomeArticle image={this.props.list[this.state.index]}/>
                    <div>{this.state.index + 1}/{this.props.list.length}</div>
                </div>
            </div>
        )
    }


}

export default HomeMagazine