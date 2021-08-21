import '../../stylesheets/Home.scss';
import {useTranslation} from 'react-i18next'
import HomeMagazine from "./HomeMagazine";
import HomeStyleGuide from "./HomeStyleGuide";
import HomeGetStyle from "./HomeGetStyle";

function Home(props) {
    const {t, i18n} = useTranslation()

    return (
        <section className="home">
            <HomeMagazine/>
            <HomeGetStyle text={t("recommend_button")}/>
            <HomeStyleGuide title = {t("style_guide")}/>
        </section>
    )
}

export default Home