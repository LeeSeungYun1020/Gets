import React, { useState } from "react";
import '../../stylesheets/Product.scss';
import ProductCategory from "./ProductCategory";
import {useTranslation} from "react-i18next";
import ProductItem from "./ProductItem";
import ProductItemList from "./ProductItemList";
import {withRouter} from 'react-router-dom'

const Product = ({match}) => {
    const {t, i18n} = useTranslation()
    console.log(match.params)
    const category = match.params.category === undefined ? 'outer' : match.params.category;
    const subCategory = match.params.subcategory === undefined ? 'all' : match.params.subcategory;;
    return (
        <div className="product">
            <ProductCategory

            />
            <div id = "product_list">
                <ProductItem category = {category} subCategory={subCategory}/>
                <ProductItemList category = {category} subCategory={subCategory} />
            </div>
        </div>
    )
}

export default withRouter(Product)