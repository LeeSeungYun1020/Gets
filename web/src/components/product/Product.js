import React, { useState } from "react";
import '../../stylesheets/Product.scss';
import ProductCategory from "./ProductCategory";
import {useTranslation} from "react-i18next";
import ProductItem from "./ProductItem";
import ProductItemList from "./ProductItemList";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Product = () => {
    const {t, i18n} = useTranslation()
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const category = params.category === undefined ? 'outer' : params.category;
    const subCategory = params.subcategory === undefined ? 'all' : params.subcategory;
    return (
        <div className="product">
            <div id = "product_category">
                <ProductCategory/>
            </div>
            <div id = "product_list">
                <ProductItem category = {category} subCategory={subCategory}/>
                <ProductItemList category = {category} subCategory={subCategory} />
            </div>
        </div>
    )
}

export default Product