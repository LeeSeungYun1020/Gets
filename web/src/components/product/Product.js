import React, { useState } from "react";
import '../../stylesheets/Product.scss';
import ProductCategory from "./ProductCategory";
import {useTranslation} from "react-i18next";
import ProductItem from "./ProductItem";
const Product = () => {
    const {t, i18n} = useTranslation()
    const [location, setLocation] = useState(t("outer"));
    const [subLocation, setSubLocation] = useState();
    const [isSub, setisSub] = useState(false)
    const onLocationClick = e => {
        setLocation(e.target.innerText)
        setSubLocation(null);
        setisSub(false);
    }
    const onSubLocationClick = e => {
        console.log(e);
        setSubLocation(e.target.value)
        setisSub(true)
    }
    return (
        <div className="product">
            <ProductCategory onLocationClick = {onLocationClick} onSubLocationClick={onSubLocationClick} isSub = {isSub} />
            <ProductItem location = {location} setLocation = {setLocation} subLocation = {subLocation} setSubLocation = {setSubLocation} />
        </div>
    )
}

export default Product