import '../../stylesheets/Closet.scss';
import React, {useEffect, useState} from "react";
import ClosetList from "./ClosetList";
import ClosetCategory from "./ClosetCategory";
import {withRouter} from "react-router-dom";
import axios from "axios";

const Closet = ({match}) => {
    // console.log(match.params)
    const category = match.params.category || 'coordination'
    const [last, setLast] = useState();
    // console.log(id)

    return (
        <div className="closet">
            <ClosetCategory category={category}/>
            <ClosetList category={category} />
        </div>
    )
}

export default withRouter(Closet);