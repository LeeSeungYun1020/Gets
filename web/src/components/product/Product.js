import React, { useState } from "react";
import '../../stylesheets/Product.scss';
import ProductCategory from "./ProductCategory";
import {useTranslation} from "react-i18next";
import ProductItem from "./ProductItem";
const Product = () => {
    const {t, i18n} = useTranslation()
    const [location, setLocation] = useState(t("outer"));
    const [detailLocation, setDetailLocation] = useState(t("look_all"));
    const onDetailLocationClick_outer = e => {
        console.log(e);
        setLocation(t("outer"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_top = e => {
        console.log(e);
        setLocation(t("top"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_bottom = e => {
        console.log(e);
        setLocation(t("bottom"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_skirt = e => {
        console.log(e);
        setLocation(t("skirt"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_set = e => {
        console.log(e);
        setLocation(t("set"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_shoes = e => {
        console.log(e);
        setLocation(t("shoes"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_bag = e => {
        console.log(e);
        setLocation(t("bag"));
        setDetailLocation(e.target.innerText)
    }
    const onDetailLocationClick_hat = e => {
        console.log(e);
        setLocation(t("hat"));
        setDetailLocation(e.target.innerText)
    }
    return (
        <div className="product">
            <ProductCategory onDetailLocationClickOuter = {onDetailLocationClick_outer}
                             onDetailLocationClickTop = {onDetailLocationClick_top}
                             onDetailLocationClickBottom = {onDetailLocationClick_bottom}
                             onDetailLocationClickSkirt = {onDetailLocationClick_skirt}
                             onDetailLocationClickSet = {onDetailLocationClick_set}
                             onDetailLocationClickShoes = {onDetailLocationClick_shoes}
                             onDetailLocationClickBag = {onDetailLocationClick_bag}
                             onDetailLocationClickHat = {onDetailLocationClick_hat}/>
            <ProductItem location = {location} setLocation = {setLocation} detailLocation = {detailLocation} setDetailLocation = {setDetailLocation}/>
        </div>
    )
}

export default Product