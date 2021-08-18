import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "axios";
import ProductDetailPageItem from "./ProductDetailPageItem";
const ProductDetailPage = ({match}) => {
    const id = match.params.id
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const {i18n, t} = useTranslation()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/product/${id}`,{ withCredentials: true });
                setItem(response.data);
                console.log(response.data);

            } catch(e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    },[]);

    // 대기 중일 때
    if(loading) {
        return <div><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }

    return(
        <ProductDetailPageItem item={item} />
    )
}

export default withRouter(ProductDetailPage)