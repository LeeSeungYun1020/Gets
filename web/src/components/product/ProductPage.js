import React from "react";
import Product from "./Product";
import {withRouter} from 'react-router-dom'

const ProductPage = ({match}) => {
    console.log(match.params)
    return (
        <Product/>
    )
}

export default withRouter(ProductPage);