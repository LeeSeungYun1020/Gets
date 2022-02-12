import NotFoundImage from "../images/logo/not_found.png"
import {useTranslation} from "react-i18next";
import {useRouteMatch} from "react-router-dom";

function NotFound(props) {
    const {t, i18n} = useTranslation()
    let match = useRouteMatch();
    return (
        <div className={"not_found_box"}>
            <h1>{t("not_found_title")}</h1>
            <img src={NotFoundImage}/>
            <h2>{t("not_found_subtitle")}<br/>{match.url}</h2>
        </div>
    )
}

export default NotFound