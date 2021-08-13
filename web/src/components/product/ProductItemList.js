import React, {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import ProductCard from "./ProductCard";
import { Category, SubCategory } from "../Data";

const ProductItemList = ({category, subCategory}) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [t, i18n] = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                    const query_1 = `${category}`;
                    const query_2 = `${subCategory}`;
                    console.log(`${category}`)
                    console.log(`${subCategory}`)
                    const response = await axios.get(`http://localhost:3000/product/category/${Category[query_1]}/${SubCategory[query_2]}`,{ withCredentials: true })
                    ;
                    console.log(`http://localhost:3000/product/category/${Category[query_1]}/${SubCategory[query_2]}`)
                    setItem(response.data);
            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, [subCategory]);

    // 대기 중일 때
    if(loading) {
        return <div className = "product_card"><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <div className = "product_card">
            {item.map(item => (
                <ProductCard item = {item} />
            ))}
        </div>
    )
}

export default ProductItemList;