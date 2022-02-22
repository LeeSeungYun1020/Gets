import React from "react";
import {useTranslation} from "react-i18next";

const ProductItem = ({category, subCategory}) => {
    const {t, i18n} = useTranslation()

    return (
        <div style={{marginTop: 90}}>
            <div className="my_location">
                <h4>{t("category")}</h4>
                <h4 className="location_arrow">{'>'}</h4>
                <h4>{t(`${category}`)}</h4>
                <h4 className="location_arrow">{'>'}</h4>
                <h4>{t(`${subCategory}`)}</h4>
            </div>
        </div>
    )
}

export default ProductItem