import '../stylesheets/Home.scss';
import {useTranslation} from 'react-i18next'
import HomeMagazine from "./HomeMagazine";
import HomeStyleSelect from "./HomeStyleSelect";
import HomeRecommend from "./HomeRecommend";
import HomeRecommendStyle from "./HomeRecommendStyle"
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
import HomeStyleGuide from "./HomeStyleGuide";
import HomeGetStyle from "./HomeGetStyle";

function Home(props) {
    const {t, i18n} = useTranslation()

    return (
        <section>
            <HomeMagazine/>
            <HomeGetStyle text={t("recommend_button")}/>
            <HomeRecommendStyle title={t("recommend_style")} content={t("recommend_content")} text={t("view_more")}/>
            <HomeStyleGuide title = {t("style_guide")}/>
        </section>
    )
}

export default Home