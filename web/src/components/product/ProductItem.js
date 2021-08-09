import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import ProductItemList from "./ProductItemList";
import {useTranslation} from "react-i18next";

const ProductItem = (props) => {
    const {t, i18n} = useTranslation()

    return (
        <div style={{ marginTop: 70}}>
            <div className="my_location">
                <h4>{t("category")}</h4>
                <h4 className="location_arrow">{'>'}</h4>
                <h4>{props.location}</h4>
               <h4 className="location_arrow">{'>'}</h4>
                <h4>{props.detailLocation}</h4>
            </div>
        {/*<ProductItemList />*/}
        </div>
    )
}

export default ProductItem