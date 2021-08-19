import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import axios from "axios";
import HomeRecommend from "../home/HomeRecommend";
import CasualChip from "../../images/home/Oval_casual.webp";
import CampusChip from "../../images/home/Oval_campus.webp";
import StreetChip from "../../images/home/Oval_street.webp";
import RockchicChip from "../../images/home/Oval_rockchic.webp";
import AmekajiChip from "../../images/home/Oval_amekaji.webp";
import CityboyChip from "../../images/home/Oval_cityboy.webp";
import OfficeChip from "../../images/home/Oval_office.webp";
import SexyglamChip from "../../images/home/Oval_sexyglam.webp";
import FeminineChip from "../../images/home/Oval_feminine.webp";
import LovelyChip from "../../images/home/Oval_lovely.webp";
import MinimalChip from "../../images/home/Oval_minimal.webp";
import OutlineSelectBox from "./OutlineSelectBox";
import OutlineSelectShapeBox from "./OutlineSelectShapeBox";
import link from "../../link";

const DetailInfoItem = props => {
    const {t, i18n} = useTranslation()
    const history = useHistory()
    const chipList = [
        {image: CasualChip, text: t("casual")},
        {image: CampusChip, text: t("campus")},
        {image: StreetChip, text: t("street")},
        {image: RockchicChip, text: t("rock_chic")},
        {image: AmekajiChip, text: t("amekaji")},
        {image: CityboyChip, text: t("city_boy")},
        {image: OfficeChip, text: t("office")},
        {image: SexyglamChip, text: t("sexy_glam")},
        {image: FeminineChip, text: t("feminine")},
        {image: LovelyChip, text: t("lovely")},
        {image: MinimalChip, text: t("minimal")},
    ]
    const [gender, SetGender] = useState('');
    const [height, SetHeight] = useState('');
    const [weight, SetWeight] = useState('');
    const [topSize, SetTopSize] = useState('');
    const [bottomSize, SetBottomSize] = useState('');
    const [style, SetStyle] = useState(0);
    const [shoulderSize, setShoulderSize] = useState('');
    const [waistSize, setWaistSize] = useState('');
    const [hipSize, setHipSize] = useState('');
    const [thighSize, setThighSize] = useState('');

    const handleHeightChange = useCallback( (e) => {
        SetHeight(e.target.value);
    },[]);
    const handleWeightChange = useCallback( (e) => {
        SetWeight(e.target.value);
    },[]);
    const handleManClick = useCallback( () => {
        SetGender(1);
    },[]);
    const handleWomanClick = useCallback(() => {
        SetGender(2);
    },[]);
    const handleTopSizeClick = useCallback((e) => {
        SetTopSize(e.target.value);
        console.log(e.target.value);
    },[]);
    const handleBottomSizeClick = useCallback((e) => {
        SetBottomSize(e.target.value);
        console.log(e.target.value);
    },[]);
    const handleShoulderClick = useCallback((e) => {
        setShoulderSize(e.target.value);
        console.log(e.target.value);
    },[]);
    const handleWaistClick = useCallback((e) => {
        setWaistSize(e.target.value);
        console.log(e.target.value);
    },[]);
    const handleHipClick = useCallback((e) => {
        setHipSize(e.target.value);
        console.log(e.target.value);
    },[]);
    const handleThighClick = useCallback((e) => {
        setThighSize(e.target.value);
        console.log(e.target.value);
    },[]);
    const onSubmit = (e) => {
        console.log(gender)
        e.preventDefault();
        axios.post('http://localhost:3000/auth/signup/info', {
            gender: gender,
            height: height,
            weight: weight,
            top_size: topSize,
            bottom_size: bottomSize,
            style: style,
            shoulder: shoulderSize,
            waist: waistSize,
            hip: hipSize,
            thigh: thighSize
        },{ withCredentials: true })
            .then(function (response) {
                history.replace('/')
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <div id = "detail_info_item">
            <form onSubmit={onSubmit}>
                <label>
                    <div className="info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.gender}</h4>
                    </div>
                    <div className="detail_gender">
                        <input type="button" id={"man"} value = {t("man")} style = {{backgroundColor : gender === 1 ? "#7eb693" :"#ffffff", color : gender === 1 ? "#ffffff" : "#000000" }} onClick={handleManClick} />
                        <input type="button" name={"woman"} value = {t("woman")} style = {{backgroundColor : gender === 2 ? "#7eb693" :"#ffffff", color : gender === 2 ? "#ffffff" : "#000000" }} onClick={handleWomanClick} />
                    </div>
                </label>

                <label>
                    <div className="info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.height}</h4>
                    </div>
                    <input type="number" name={"height"} value={height} onChange={handleHeightChange}
                            required/>
                </label>

                <label>
                    <div className="info">
                        <h4 className="essential">{props.essential}</h4>
                        <h4>{props.weight}</h4>
                    </div>
                    <input type="number" name={"weight"} value={weight} onChange={handleWeightChange}
                            required/>
                </label>

                <label>
                    <div className="info" style={{flexDirection:"column"}}>
                        <div id = "size_div">
                            <h4 className = "essential" style={{marginBottom: "0", marginTop: "0"}}>{props.essential}</h4>
                            <h4 style={{marginBottom: "0", marginTop: "0"}}>{props.size}</h4>
                        </div>
                        <div id = "detail_selectbox">
                            <div className= "detailbox_div">
                                <OutlineSelectBox info={t("top_size")} event={handleTopSizeClick} value = {topSize} />
                                <OutlineSelectBox info={t("bottom_size")} event={handleBottomSizeClick} value = {bottomSize} />
                            </div>
                            <div className= "detailbox_div">
                                <OutlineSelectShapeBox info = {t("shoulder")} event={handleShoulderClick} value = {shoulderSize}/>
                                <OutlineSelectShapeBox info = {t("waist")} event={handleWaistClick} value = {waistSize}/>
                            </div>
                            <div className= "detailbox_div">
                                <OutlineSelectShapeBox info = {t("hip")} event={handleHipClick} value = {hipSize}/>
                                <OutlineSelectShapeBox info = {t("thigh")} event={handleThighClick} value = {thighSize}/>
                            </div>
                        </div>
                    </div>
                </label>
                <label>
                    <div className="info">
                        <div id = "prefer_style">
                            <div id="prefer_info">
                                <h4 className="essential" style={{marginBottom: "0px"}}>{props.essential}</h4>
                                <h4 style={{marginBottom: "0px"}}>{props.prefer_style}</h4>
                                <h5 style={{marginBottom: "0px", marginRight: "0px", marginLeft: "auto", color:"#d4d3d3"}}>{props.selectable}</h5>
                            </div>
                        <HomeRecommend chips={chipList} text={t("recommend_button")} style={style} SetStyle={SetStyle}/>
                        </div>
                    </div>
                </label>
                <input id="detail_submit" type="submit" value={props.add_info}/>
            </form>
        </div>
    )
}

export default DetailInfoItem