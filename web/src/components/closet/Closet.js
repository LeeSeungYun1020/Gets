import '../../stylesheets/Closet.scss';
import React from "react";
import ClosetList from "./ClosetList";
import ClosetCategory from "./ClosetCategory";
import {withRouter} from "react-router-dom";

const Closet = ({match}) => {
    console.log(match.params)
    const category = match.params.category || 'coordination'
    return (
        <div className="closet">
            <ClosetCategory category={category}/>
            <ClosetList category={category} />
        </div>
    )
}

export default withRouter(Closet);