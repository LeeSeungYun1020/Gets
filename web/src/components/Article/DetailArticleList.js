import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {StringToNumStyle} from "../Data";
import {useHistory} from "react-router-dom";
const DetailArticleList = ({id}) => {
    const history = useHistory()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(false);
    const {t, i18n} = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/home/style/${id}/8`)
                setItem(response.data)
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[id])
    if(loading) {
        return <div><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }

    const onCardClick = (e) => {
        history.push({
            pathname:`/closet/coordination/${e}`
        })
    }
    return (
        <div className="style-coordi-card-list">
            {item.map(item => <div onClick = {() => onCardClick(item.id)} className = "style-coordi-card"><img src={`http://localhost:3000/coordination/image/${item.id}`}/></div>)}
        </div>
    )
};

export default DetailArticleList;