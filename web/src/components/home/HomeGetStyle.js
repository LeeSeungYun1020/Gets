import React, {useCallback, useEffect, useState} from "react";
import HomeRecommend from "./HomeRecommend";
import HomeStyleSelect from "./HomeStyleSelect";
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
import {useTranslation} from "react-i18next";
import axios from "axios";
import HomeRecommendCard from "./HomeRecommendCard";
import { MdAdd, MdRemove } from "react-icons/md";
import {StringToNumAge, StringToNumGender, StringToNumFit} from "../Data";

const HomeGetStyle = (props) => {
    const {t, i18n} = useTranslation()
    const [ans, setAns] = useState(false);
    const [gender, setGender] = useState(2);
    const [age, setAge] = useState(1);
    const [topFit, setTopFit] = useState(1);
    const [bottomFit, setBottomFit] = useState(1)
    const [style, setStyle] = useState(0);
    const [modify, setModify] = useState(false);
    const chipList = [
        {image: CasualChip, text: t("casual")},
        {image: CampusChip, text: t("campus")},
        {image: StreetChip, text: t("street")},
        {image: RockchicChip, text: t("rock-chic")},
        {image: AmekajiChip, text: t("amekaji")},
        {image: CityboyChip, text: t("city-boy")},
        {image: OfficeChip, text: t("office")},
        {image: SexyglamChip, text: t("sexy-glam")},
        {image: FeminineChip, text: t("feminine")},
        {image: LovelyChip, text: t("lovely")},
        {image: MinimalChip, text: t("minimal")},
    ]
    // const query = qs.parse(location && location.search);
    // const detail = query.detail === 'true'; //
    useEffect(() => {
        if (sessionStorage.getItem("token")) { // 로그인 한 사람은 자동으로 추천코디 띄워줌
            axios.get('http://localhost:3000/home/custom/8', { withCredentials: true })
                .then(({data}) => {
                    // console.log(data);
                    setRecommend(data)
                    setAns(true);
                })
            }
        }, []) // 화면에 맨 처음 렌더링될 때만 실행

    const selectAreaList = [
        {title: t("gender"), index: 1, default: t("woman"), list: [t("woman"), t("man")], setType: setGender},
        {
            title: t("age"),
            index: 2,
            default: t("age_10"),
            list: [t("age_10"), t("age_20"), t("age_30"), t("age_40"), t("age_50")],
            setType: setAge
        },
        {
            title: t("top_fit"),
            index: 3,
            default: t("fit_regular"),
            list: [t("fit_slim"), t("fit_regular"), t("fit_over")],
            setType: setTopFit
        },
        {
            title: t("bottom_fit"),
            index: 4,
            default: t("fit_regular"),
            list: [t("fit_regular"), t("fit_over"), t("fit_wide"), t("fit_semi_wide"), t("fit_slim"), t("fit_tapered"), t("fit_bootcut"),],
            setType: setBottomFit
        },
    ]

    const [recommend, setRecommend] = useState([])
    const onSubmit = useCallback(e => {
        // console.log(StringToNumGender[gender], StringToNumAge[age], StringToNumFit[topFit], StringToNumFit[bottomFit], style)
        e.preventDefault();
        let genderNumber = StringToNumGender[gender]
        let ageNumber = StringToNumAge[age]
        let topFitNumber = StringToNumFit[topFit]
        let bottomFitNumber = StringToNumFit[bottomFit]
        let query = `?gender=${genderNumber}&age=${ageNumber}&topFit=${topFitNumber}&bottomFit=${bottomFitNumber}&style=${style}`
        axios.get('http://localhost:3000/home/getStyle/8' + query, { withCredentials: true })
            .then(({data}) => {setRecommend(data)
                setAns(true);
            })

    },[gender, age, topFit, bottomFit, style]);
    const iconClick = useCallback( () => {
        setModify(!modify)
    },[modify]);
    return (
        <div className="home_getstyle">
            { (sessionStorage.getItem("token")&&!modify) ? <div className = "modify_option_button"><MdAdd onClick={iconClick}/></div> :
                <>
                    { sessionStorage.getItem("token") && <div className = "modify_option_button"><MdRemove onClick={iconClick}/></div>}
                    <HomeStyleSelect title={t("select_info")} list={selectAreaList}/>
                    <HomeRecommend title={t("select_style")} chips={chipList} text={t("recommend_button")} style={style}
                    SetStyle={setStyle}/>
                    <div id="home_button">
                        <button id="getstyle_button" onClick={onSubmit}>{props.text}</button>
                    </div>
                    <div className="recommend_line"></div>
                </>
            }
            {(ans||sessionStorage.getItem("token")) && <div>
                <div id="recommend_style">
                <h1>{t("recommend_style")}</h1>
                <p>{t("recommend_content")}</p>
                </div>
            </div>}

            {(ans||sessionStorage.getItem("token")) && <><div id = "recommend_card">
                {recommend.map((recommend, index) => (
                    <HomeRecommendCard title={recommend.title} cost={recommend.price} image_id={recommend.imageID} id ={recommend.id} />
                ))}
            </div>
                <div className ="recommend_line"></div></>}
        </div>
    )
};

export default HomeGetStyle;