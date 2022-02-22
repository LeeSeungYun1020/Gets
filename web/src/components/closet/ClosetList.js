import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import ClosetCard from "./ClosetCard";
import {useHistory} from "react-router-dom";

const ClosetList = ({category}) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [t, i18n] = useTranslation()

    const onRemove = useCallback(
        id => {
            setItem(item.filter(item => item.id !== id)) // 선택된 id 거름

        }, [item]
    )
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/closet/${category}`, {withCredentials: true})
                ;
                setItem(response.data);
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, [category]);

    // 대기 중일 때
    if (loading) {
        return <div className="closet_card_list"><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <div className="closet_card_list">
            {/*{console.log(item)}*/}
            {item.map(item => (
                <ClosetCard item={item} onRemove={onRemove} category={category}/>
            ))}
        </div>
    )
}

export default ClosetList;