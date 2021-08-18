import { NumToStringStyle } from "../Data";
import React, {useEffect, useState} from "react";
const DetailArticle = ({what}) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // try {
            //     const id = `${NumToStringStyle[what]}`;
            //     const response = await axios.get(`https://localhost:3000/`)
            // }
        }
    })
    return <div></div>
}

export default DetailArticle