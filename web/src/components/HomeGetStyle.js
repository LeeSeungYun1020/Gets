import React, {useState} from "react";
import HomeRecommend from "./HomeRecommend";
import HomeStyleSelect from "./HomeStyleSelect";
import CasualChip from "../images/home/Oval_casual.webp";
import CampusChip from "../images/home/Oval_campus.webp";
import StreetChip from "../images/home/Oval_street.webp";
import RockchicChip from "../images/home/Oval_rockchic.webp";
import AmekajiChip from "../images/home/Oval_amekaji.webp";
import CityboyChip from "../images/home/Oval_cityboy.webp";
import OfficeChip from "../images/home/Oval_office.webp";
import SexyglamChip from "../images/home/Oval_sexyglam.webp";
import FeminineChip from "../images/home/Oval_feminine.webp";
import LovelyChip from "../images/home/Oval_lovely.webp";
import MinimalChip from "../images/home/Oval_minimal.webp";
import {useTranslation} from "react-i18next";
import axios from "axios";
import HomeRecommendCard from "./HomeRecommendCard";

const HomeGetStyle = (props) => {
    const {t, i18n} = useTranslation()
    const [ans, setAns] = useState(false);
    const [gender, setGender] = useState(2);
    const [age, setAge] = useState(1);
    const [bodyType, setBodyType] = useState();
    const [fit, setFit] = useState(1)
    const [style, setStyle] = useState(0);

    const chipList = [
        {image: CasualChip, text: t("style_casual")},
        {image: CampusChip, text: t("style_campus")},
        {image: StreetChip, text: t("style_street")},
        {image: RockchicChip, text: t("style_rock_chic")},
        {image: AmekajiChip, text: t("style_amekaji")},
        {image: CityboyChip, text: t("style_city_boy")},
        {image: OfficeChip, text: t("style_office")},
        {image: SexyglamChip, text: t("style_sexy_glam")},
        {image: FeminineChip, text: t("style_feminine")},
        {image: LovelyChip, text: t("style_lovely")},
        {image: MinimalChip, text: t("style_minimal")},
    ]

    const selectAreaList = [
        {title: t("gender"), index: 1, default: t("woman"), list: [t("woman"), t("man")]},
        {
            title: t("age"),
            index: 2,
            default: t("age_10"),
            list: [t("age_10"), t("age_20"), t("age_30"), t("age_40"), t("age_50")],
        },
        {
            title: t("top_fit"),
            index: 3,
            default: t("fit_regular"),
            list: [t("fit_slim"), t("fit_regular"), t("fit_over")],
        },
        {
            title: t("bottom_fit"),
            index: 4,
            default: t("fit_regular"),
            list: [t("fit_regular"), t("fit_over"), t("fit_wide"), t("fit_semi_wide"), t("fit_slim"), t("fit_tapered"), t("fit_bootcut"),],
        },
    ]

    const [recommend, setRecommend] = useState([])
    const onSubmit = e => {
        e.preventDefault();
        axios.get('http://localhost:3000/home/custom/8')
            .then(({data}) => {setRecommend(data)
                console.log(data)
                setAns(true);
            })
    }
    return (
        <div id="home_getstyle">
            <HomeStyleSelect title={t("select_info")} list={selectAreaList}/>
            <HomeRecommend title={t("select_style")} chips={chipList} text={t("recommend_button")} style={style}
                           SetStyle={setStyle}/>
            <div id="home_button">
                <button id="getstyle_button" onClick={onSubmit}>{props.text}</button>
            </div>

            {ans && <div>
                <div className="recommend_line"></div>
                <div id="recommend_style">
                <h1>{t("recommend_style")}</h1>
                <p>{t("recommend_content")}</p>
                </div>
            </div>}

            <div id = "recommend_card">
                {recommend.map((recommend, index) => (
                    <HomeRecommendCard title={recommend.title} cost={recommend.price} image_id={recommend.imageID} />
                ))}
            </div>
        </div>
    )
}

export default HomeGetStyle;