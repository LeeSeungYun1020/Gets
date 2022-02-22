import React, {useEffect, useState} from "react";
import {useHistory, withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "axios";
import ProductDetailPageItem from "./ProductDetailPageItem";

const ProductDetailPage = ({match}) => {
    const history = useHistory();
    const id = match.params.id
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const {i18n, t} = useTranslation()
    let last;
    useEffect(() => {
        axios.get('http://localhost:3000/product/number', {withCredentials: true})
            .then(response => {
                // console.log(response)
                last = response.data[0].id
                // console.log(last);
                const fetchData = async () => {
                    setLoading(true);
                    // console.log(last)
                    try {
                        if (id > 2 && id <= last) {
                            const response = await axios.get(`http://localhost:3000/product/${id}`, {withCredentials: true});
                            setItem(response.data);
                        } else {
                            history.push('/product')
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setLoading(false);
                }
                fetchData();
            })
        // console.log(last)
    }, []);

    // 대기 중일 때
    if (loading) {
        return <div><h3>로딩 중 ...</h3></div>
    }
    // 아직 item이 설정되지 않았을 때
    if (!item) {
        return null;
    }

    return (
        <ProductDetailPageItem item={item}/>
    )
};

export default withRouter(ProductDetailPage)