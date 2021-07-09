import '../stylesheets/Home.scss';
import {useTranslation} from 'react-i18next'
import HomeMagazine from "./HomeMagazine";
import HomeStyleSelect from "./HomeStyleSelect";
import HomeRecommend from "./HomeRecommend";

import CasualChip from "../images/home/Oval_casual.webp"
import CampusChip from "../images/home/Oval_campus.webp"
import StreetChip from "../images/home/Oval_street.webp"
import RockchicChip from "../images/home/Oval_rockchic.webp"
import AmekajiChip from "../images/home/Oval_amekaji.webp"
import CityboyChip from "../images/home/Oval_cityboy.webp"
import OfficeChip from "../images/home/Oval_office.webp"
import SexyglamChip from "../images/home/Oval_sexyglam.webp"
import FeminineChip from "../images/home/Oval_feminine.webp"
import LovelyChip from "../images/home/Oval_lovely.webp"
import MinimalChip from "../images/home/Oval_minimal.webp"

function Home(props) {
    const {t, i18n} = useTranslation()

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
            list: [t("age_10"), t("age_20"), t("age_30"), t("age_40"), t("age_50")]
        },
        {
            title: t("body_type"),
            index: 3,
            default: t("lower_body_fat"),
            list: [t("lower_body_fat"), t("upper_body_fat"), t("slim"), t("tall"), t("short")]
        },
        {
            title: t("fit"),
            index: 4,
            default: t("fit_regular"),
            list: [t("fit_regular"), t("fit_over"), t("fit_wide"), t("fit_semi_wide"), t("fit_slim"), t("fit_tapered"), t("fit_bootcut"),]
        },
        {
            title: t("price"),
            index: 5,
            default: t("price1"),
            list: [t("price1"), t("price2"), t("price3"), t("price4"), t("price5"), t("price_expensive"),]
        },
    ]

    return (
        <section>
            <HomeMagazine/>
            <HomeStyleSelect title={t("select_info")} list={selectAreaList}/>
            <HomeRecommend title={t("select_style")} chips={chipList}/>
        </section>
    )
}

export default Home