import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import ClosetCard from "./ClosetCard";
import {useHistory} from "react-router-dom";

const DetailInfoCard = ({id}) => {
    const history = useHistory();
    const [item, setItem] = useState(null);
    const [outer, setOuter] = useState(null);
    const [top, setTop] = useState(null);
    const [bottom, setBottom] = useState(null);
    const [bag, setBag] = useState(null);
    const [style, setStyle] = useState([]);
    const [hat, setHat] = useState(null);
    const [shoes, setShoes] = useState(null);
    const [skirt, setSkirt] = useState(null);
    const [loading, setLoading] = useState(false);
    const all = [outer, top, bottom, bag, style, hat, shoes, skirt]
    let realAll = [];
    const {i18n, t} = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/coordination/${id}`,{ withCredentials: true });
                setItem(response.data);
                console.log(response.data);
                const response_top = await axios.get(`http://localhost:3000/product/${response.data.topID}`,{ withCredentials: true });
                const response_outer = await axios.get(`http://localhost:3000/product/${response.data.outerID}`,{ withCredentials: true });
                const response_bottom = await axios.get(`http://localhost:3000/product/${response.data.bottomID}`,{ withCredentials: true });
                const response_bag = await axios.get(`http://localhost:3000/product/${response.data.bagID}`,{ withCredentials: true });
                const response_style = await axios.get(`http://localhost:3000/product/${response.data.style}`,{ withCredentials: true });
                const response_hat = await axios.get(`http://localhost:3000/product/${response.data.hatID}`,{ withCredentials: true });
                const response_shoes = await axios.get(`http://localhost:3000/product/${response.data.shoesID}`,{ withCredentials: true });
                const response_skirt = await axios.get(`http://localhost:3000/product/${response.data.skirtID}`,{ withCredentials: true });
                console.log(response_top.data)
                console.log(response_outer.data)
                setTop(response_top);
                setOuter(response_outer);
                setBottom(response_bottom);
                setBag(response_bag);
                setStyle(response_style);
                setHat(response_hat);
                setShoes(response_shoes);
                setSkirt(response_skirt);
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    // 대기 중일 때
    if(loading) {
        return <div><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    else {
        realAll = all.filter(item => item.data.result !== false)
    }
    const onCardClick = (e) => {
        history.push({
            pathname: `/product/${e}`
        })
    }
    return (
        <div className = "coordi_card">
            <h1>{item.title}</h1>
            <div className= "detail-div">
                <div className = "detail_coordi_card">
                    {/*{console.log(realAll)}*/}
                    <div className = "item_list">
                        {realAll.map(all => (
                            <div className="item_info">
                                <img onClick={() => onCardClick(all.data.id)} className = "detail_item_img" src = {`http://localhost:3000/product/image/${all.data.image1ID}`}/>
                                <h3>{all.data.name}</h3>
                                <p style = {{
                                    color: '#828282'}}>{all.data.brand}</p>
                                <p style = {{
                                    display: 'flex',
                                    flexDirection: 'row-reverse'
                                }}>{all.data.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className = "coordi_img">
                    <img style={{width: 455, height: 455}} src = {`http://localhost:3000/coordination/image/${item.id}`} />
                </div>
            </div>
            <button id ="virtualFitting-button">{t("virtual_fitting")}</button>
        </div>
    )
};

export default DetailInfoCard;