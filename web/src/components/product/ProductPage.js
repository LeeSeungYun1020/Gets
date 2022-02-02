import React from "react";
import Product from "./Product";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
const ProductPage= () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Product />
    )
}

export default ProductPage;