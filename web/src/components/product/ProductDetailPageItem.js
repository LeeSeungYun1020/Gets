import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {NumToStringSeason, NumToStringAge, NumToStringColor, NumToStringStyle, NumToStringFiber,
    NumToStringKrStyle, NumToStringGender,
    NumToStringCategory, NumToStringBottom, NumToStringTop, NumToStringOuter, NumToStringSet, NumToStringSkirt, NumToStringBag, NumToStringShoes, NumToStringHat} from "../Data";
import Favorite from "@material-ui/icons/Favorite";
import axios from "axios";
import {useHistory} from "react-router-dom";
import isLogin from "../../lib/isLogin";
const ProductDetailPageItem = ({item}) => {
    const {t, i18n} = useTranslation()
    const history = useHistory()
    const {id, price, brand, name, color, fiber, age, style, size, season, type, detail, image1ID, gender} = item
    const [subCategory, setSubCategory] = useState('');
    const [allStyle, setAllStyle] = useState([]) // 스타일 배열에 넣자
    const [weather, setWeather] = useState([]) // 얘도 배열에 넣자..
    const [allColor, setAllColor] = useState([]) // 너도 배열로 가자!!!
    const [allFiber, setAllFiber] = useState([]) // 너도 배열로 가자!!!!!
    const [allAge, setAllAge] = useState([]) // 너도 배열로 가아아아아아아아아ㅏ아아아
    let allSize = `${size}`.split(',');

    const onButtonClick = () => {
        if(!isLogin()){
            history.push('/account/signin')
        }
        else {
            axios.get(`http://localhost:3000/product/favorite/${id}`, {withCredentials: true})
                .then(response => {
                    // console.log(response)
                    if (response.data.result) {
                        alert("내 옷장에 추가되었습니다!")
                    } else {
                        alert("이미 내 옷장에 존재하는 옷입니다!")
                        // console.log(response)
                    }
                })
                .catch(function (error) {
                });
        }
    }

    useEffect(() => {
        let text;
        if(type === 1){
            text = NumToStringOuter[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else if (type === 2) {
            text = NumToStringTop[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else if (type === 3) {
            text = NumToStringBottom[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else if (type === 4) {
            text = NumToStringSkirt[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else if (type === 5) {
            text = NumToStringSet[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else if (type === 6) {
            text = NumToStringShoes[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else if (type === 7) {
            text = NumToStringBag[`${detail}`]
            setSubCategory(t(`${text}`))
        }
        else {
            text = NumToStringHat[`${detail}`]
            setSubCategory(t(`${text}`))
        }
    }, [])
    useEffect(() => {
        if(season&1) {
            setWeather(weather => [...weather, 1])
        }
        if(season&2) {
            setWeather(weather => [...weather, 2])
        }
        if(season&4){
            setWeather(weather => [...weather, 4])
        }
        if(season&8){
            setWeather(weather => [...weather, 8])
        }
        for(let i = 0; i < 11; i++) {
            if(style&2**i) {
                setAllStyle(allStyle => [...allStyle, 2**i])
            }
        }
        for(let i = 0; i < 21; i++) {
            if(color&2**i) {
                setAllColor(allColor => [...allColor, 2**i])
            }
        }
        for(let i = 0; i < 9; i++) {
            if(fiber&2**i) {
                setAllFiber(allFiber => [...allFiber, 2**i])
            }
        }
        for(let i = 0; i < 6; i++) {
            if(age&2**i) {
                setAllAge(allAge => [...allAge, 2**i])
            }
        }
    },[])
    return (
    <div className = "detail-product">
        <div id = "detail-div">
            <div id = "product-category">
                <h4>{t("category")}</h4>
                <h4 className="location_arrow">{'>'}</h4>
                <h4>{t(`${NumToStringCategory[`${type}`]}`)}</h4>
                <h4 className="location_arrow">{'>'}</h4>
                <h4>{subCategory}</h4>
            </div>
            <div id = "detail-product-img">
                <img src = {`http://localhost:3000/product/image/${image1ID}`} />
            </div>
        </div>
        <div className = "detail-info">
            <h3 style={{marginTop: '50px', marginBottom: '7px'}}>{brand}</h3>
            <h2 style={{marginBottom: '7px'}}>{name}</h2>
            <div id = "money-div" style={{display: 'flex', alignContent: 'center'}}>
                <h1>{price.toLocaleString()}</h1>
                <h2>{t("won")}</h2>
            </div>
            <div className="detail-line" />
            <div style={{marginTop: '24px'}} className = "detail-module">
                <h4 className="module-title">{t("season")}</h4>
                <div className="detail-module-right">
                    {weather.map(item => <h4>{t(`${NumToStringSeason[`${item}`]}`)}</h4>) }
                </div>
            </div>
            <div className = "detail-module">
                <h4 className="module-title">{t("gender")}</h4>
                <div className="detail-module-right">
                    <h4>{t(`${NumToStringGender[`${gender}`]}`)}</h4>
                </div>
            </div>
            <div className = "detail-module">
                <h4 className="module-title">{t("size")}</h4>
                <div className="detail-module-right">
                    {console.log(allSize)}
                    {allSize.map(item => <h4>{item}</h4>) }
                </div>
            </div>
            <div className = "detail-module">
                <h4 className="module-title">{t("color")}</h4>
                <div className="detail-module-right">
                    {allColor.map(item => <h4>{t(`${NumToStringColor[`${item}`]}`)}</h4>) }
                </div>
            </div>
            <div className = "detail-module">
                <h4 className="module-title">{t("fiber")}</h4>
                <div className="detail-module-right">
                    {allFiber.map(item => <h4>{t(`${NumToStringFiber[`${item}`]}`)}</h4>) }
                </div>
            </div>
            <div className = "detail-module">
                <h4 className="module-title">{t("age")}</h4>
                <div className="detail-module-right">
                    {allAge.map(item => <h4>{t(`${NumToStringAge[`${item}`]}`)}</h4>) }
                </div>
            </div>
            <div className = "detail-module">
                <h4 className="module-title" style={{margin: 0, alignContent: 'center'}}>{t("style")}</h4>
                <div className="detail-module-right">
                    {allStyle.map(item => <div className ="module-circle">{t(`${NumToStringKrStyle[`${item}`]}`)}</div>)}
                </div>
            </div>
            <div className="detail-line" />
            <button onClick={onButtonClick} id = "add-closet"><Favorite />{t("inmycloset")}</button>
        </div>
    </div>
    )
}
export default ProductDetailPageItem;