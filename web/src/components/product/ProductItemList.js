import React, {useEffect, useState} from "react";
import ProductItem from "./ProductItem";
import axios from "axios";
import {useTranslation} from "react-i18next";
import ProductCard from "./ProductCard";

const ProductItemList = ({category, subCategory}) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [t, i18n] = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                    const query_1 = {category};
                    const query_2 = subCategory === 'all' ? -1 : `&category=${category}`;
                    const response = await axios.get(`http://localhost:3000/product/category/${query_1}/${query_2}`,{ withCredentials: true })
                    ;
                    console.log(response);
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
        return <div>로딩 중 ...</div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }
    return (
        <div>
            {item.map(item => (
                <ProductCard item = {item} />
            ))}
        </div>
    )
}

export default ProductItemList;