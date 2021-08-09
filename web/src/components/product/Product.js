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
    const [category, setCategory] = useState(1);
    const [subCategory, setSubCategory] = useState(1);
    const onDetailLocationClick_outer = e => {
        setCategory(1);
        setSubCategory(e.target.attributes[1].nodeValue);
        setStringCategory(t("outer"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_top = e => {
        setCategory(2);
        setSubCategory(e.target.attributes[1].nodeValue);
        setStringCategory(t("top"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_bottom = e => {
        setCategory(3);
        setSubCategory(e.target.attributes[1].nodeValue);
        setStringCategory(t("bottom"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_skirt = e => {
        setCategory(4);
        setSubCategory(e.target.attributes[1].nodeValue);
        setStringCategory(t("skirt"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_set = e => {
        setCategory(5);
        setSubCategory(e.target.attributes[1].nodeValue);;
        setStringCategory(t("set"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_shoes = e => {
        setCategory(6);
        setSubCategory(e.target.attributes[1].nodeValue);
        setStringCategory(t("shoes"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_bag = e => {
        setCategory(7);
        setSubCategory(e.target.attributes[1].nodeValue);
        setStringCategory(t("bag"));
        setStringSubCategory(e.target.innerText)
    }
    const onDetailLocationClick_hat = e => {
        setCategory(8);
        setSubCategory(e.target.attributes[1].nodeValue);
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
            <div id = "product_list">
                <ProductItem location = {stringCategory} setLocation = {setStringCategory} detailLocation = {stringSubCategory} setDetailLocation = {setStringSubCategory}/>
                <ProductItemList category = {category} subCategory={subCategory} />
            </div>
        </div>
    )
}

export default Product