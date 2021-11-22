import React from 'react';
import { useHistory } from 'react-router-dom';

const Product = (props) => {

    const { id, image, name, price, code, category } = props.product;
    const history = useHistory();
    const handleDetailsBtn = (id) => {
        const uri = `productDetails/${id}`;
        history.push(uri)
    };

    return (
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={image} className="border border-1 img-fluid rounded-start h-100" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">Price: {price} €</p>
                        <small>Product Code: {code}</small>
                        <p className="card-text"><small className="text-muted">Category: {category}</small></p>
                        <button onClick={() => props.handleAddToCart(props.product)} className="btn btn-outline-success me-2">Add to cart</button>
                        <button onClick={() => handleDetailsBtn(id)} className="btn btn-outline-success">See Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;