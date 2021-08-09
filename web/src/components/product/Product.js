import React, { useState } from "react";
import '../../stylesheets/Product.scss';
import ProductCategory from "./ProductCategory";
import {useTranslation} from "react-i18next";
import ProductItem from "./ProductItem";
import ProductItemList from "./ProductItemList";

const Product = () => {
    const {t, i18n} = useTranslation()
    const [stringCategory, setStringCategory] = useState(t("outer"));
    const [stringSubCategory, setStringSubCategory] = useState(t("look_all"));
    const [category, setCategory] = useState(t("outer"));
    const [subCategory, setSubCategory] = useState(t("look_all"));
    const onDetailLocationClick_outer = e => {
        setCategory(1);
        setSubCategory(1);
        setStringCategory(t("outer"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_top = e => {
        setCategory(2);
        setSubCategory(1);
        setStringCategory(t("top"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_bottom = e => {
        console.log(e);
        setStringCategory(t("bottom"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_skirt = e => {
        console.log(e);
        setStringCategory(t("skirt"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_set = e => {
        console.log(e);
        setStringCategory(t("set"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_shoes = e => {
        console.log(e);
        setStringCategory(t("shoes"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_bag = e => {
        console.log(e);
        setStringCategory(t("bag"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_hat = e => {
        console.log(e);
        setStringCategory(t("hat"));
        setStringSubCategory(e.target.innerText)
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
            <ProductItem location = {stringCategory} setLocation = {setStringCategory} detailLocation = {stringSubCategory} setDetailLocation = {setStringSubCategory}/>
            <ProductItemList category = {category} subCategory={subCategory} />
        </div>
    )
}

export default Product