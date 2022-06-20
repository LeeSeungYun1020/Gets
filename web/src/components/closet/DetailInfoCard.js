import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {MdFavorite} from "react-icons/md";
import isLogin from "../../lib/isLogin";
import link from "../../link"

const DetailInfoCard = ({id}) => {
    const history = useHistory();
    const [item, setItem] = useState(null);
    const [outer, setOuter] = useState(null);
    const [top, setTop] = useState(null);
    const [top2, setTop2] = useState(null);
    const [bottom, setBottom] = useState(null);
    const [bag, setBag] = useState(null);
    const [hat, setHat] = useState(null);
    const [shoes, setShoes] = useState(null);
    const [skirt, setSkirt] = useState(null);
    const [set, setSet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [style, setStyle] = useState([]);
    const all = [outer, top, top2, bottom, set, bag, hat, shoes, skirt]
    let realAll = [];
    let last;
    const {i18n, t} = useTranslation()
    useEffect(() => {
        axios.get(link.base + '/coordination/number', {withCredentials: true})
            .then(response => {
                // console.log(response)
                last = response.data[0].id
                console.log(last);
                const fetchData = async () => {
                    setLoading(true);
                    try {
                        if (id > 0 && id <= last) {
                            // console.log(last)
                            const response = await axios.get(`${link.base}/coordination/${id}`, {withCredentials: true});
                            setItem(response.data);
                            const response_top = await axios.get(`${link.base}/product/${response.data.topID}`, {withCredentials: true});
                            const response_top2 = await axios.get(`${link.base}/product/${response.data.top2ID}`, {withCredentials: true});
                            const response_outer = await axios.get(`${link.base}/product/${response.data.outerID}`, {withCredentials: true});
                            const response_bottom = await axios.get(`${link.base}/product/${response.data.bottomID}`, {withCredentials: true});
                            const response_bag = await axios.get(`${link.base}/product/${response.data.bagID}`, {withCredentials: true});
                            const response_set = await axios.get(`${link.base}/product/${response.data.setID}`, {withCredentials: true});
                            const response_style = await axios.get(`${link.base}/product/${response.data.style}`, {withCredentials: true});
                            const response_hat = await axios.get(`${link.base}/product/${response.data.hatID}`, {withCredentials: true});
                            const response_shoes = await axios.get(`${link.base}/product/${response.data.shoesID}`, {withCredentials: true});
                            const response_skirt = await axios.get(`${link.base}/product/${response.data.skirtID}`, {withCredentials: true});
                            setTop(response_top);
                            setTop2(response_top2);
                            setOuter(response_outer);
                            setBottom(response_bottom);
                            setBag(response_bag);
                            setSet(response_set);
                            setStyle(response_style);
                            setHat(response_hat);
                            setShoes(response_shoes);
                            setSkirt(response_skirt);
                        } else {
                            history.goBack()
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setLoading(false);
                }
                fetchData();
            })
    }, []);

    // 대기 중일 때
    if (loading) {
        return <div><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    } else {
        realAll = all.filter(item => item.data.result !== false)
    }
    const onCardClick = (e) => {
        history.push({
            pathname: `/product/${e}`
        })
    }
    const onCoordiClick = () => {
        if (!isLogin()) {
            history.push('/account/signin')
        } else {
            axios.get(`${link.base}/coordination/favorite/${id}`, {withCredentials: true})
                .then(response => {
                    if (response.data.result) {
                        alert("내 옷장에 추가되었습니다!")
                    } else {
                        alert("이미 내 옷장에 존재하는 코디입니다!")
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (
        <div className="coordi_card">
            <h1>{item.title}</h1>
            <div className="detail-div">
                <div className="detail_coordi_card">
                    {/*{console.log(realAll)}*/}
                    <div className="item_list">
                        {realAll.map(all => (
                            <div className="item_info">
                                <img onClick={() => onCardClick(all.data.id)} className="detail_item_img"
                                     src={`${link.base}/product/image/${all.data.image1ID}`}/>
                                <h3>{all.data.name}</h3>
                                <p style={{
                                    color: '#828282'
                                }}>{all.data.brand}</p>
                                <p style={{
                                    display: 'flex',
                                    flexDirection: 'row-reverse'
                                }}>{all.data.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="coordi_img">
                    <img style={{width: 455, height: 455}} src={`${link.base}/coordination/image/${item.id}`}/>
                </div>
            </div>
            <div className="add-button-div">
                <button className="virtualFitting-button" onClick={onCoordiClick}><MdFavorite/>{t("inmycloset2")}
                </button>
                <button className="virtualFitting-button">{t("virtual_fitting")}</button>
            </div>
        </div>
    )
};
export default DetailInfoCard;