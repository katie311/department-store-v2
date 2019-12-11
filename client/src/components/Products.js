import React from "react";
import Product from './Product';


const Products = (props) => (
    props.products.map( product => (
        <Product 
            key={product.id} 
            {...product} 
        />
    )
))

export default Products;