import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import ClosetCard from "./ClosetCard";

const ClosetList = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [t, i18n] = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/closet/coordination',{ withCredentials: true })
                ;
                console.log(response)
                setItem(response.data);
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // 대기 중일 때
    if(loading) {
        return <div className = "closet_card_list"><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <div className = "product_card_list">
            {item.map(item => (
                <ClosetCard item = {item} />
            ))}
        </div>
    )
}

export default ClosetList;