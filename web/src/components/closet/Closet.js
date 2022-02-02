import '../../stylesheets/Closet.scss';
import React, {useEffect, useState} from "react";
import ClosetList from "./ClosetList";
import ClosetCategory from "./ClosetCategory";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const Closet = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const category = params.category || 'coordination'
    const [last, setLast] = useState();
    // console.log(id)

    return (
        <div className="closet">
            <ClosetCategory category={category}/>
            <ClosetList category={category} />
        </div>
    )
}

export default Closet;