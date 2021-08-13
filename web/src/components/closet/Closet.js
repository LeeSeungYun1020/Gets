import '../../stylesheets/Closet.scss';
import React from "react";
import ClosetList from "./ClosetList";

const Closet = () => {
    return (
        <div className="closet">
            <ClosetList />
        </div>
    )
}

export default Closet;