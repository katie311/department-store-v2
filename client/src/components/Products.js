import React from "react";
import Product from './Product';


const Products = (props) => (
    props.products.map( product => (
        <Product 
            key={product.id} 
            {...product} 
            deleteProduct={props.deleteProduct}
            editProduct={props.editProduct}
        />
    )
))

export default Products;