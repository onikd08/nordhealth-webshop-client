import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Cart from '../Cart/Cart';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [products] = useProducts();
    const [cart] = useCart(products);
    const history = useHistory();

    const handleGoBack = () => {
        history.push('/');
    };



    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            });
    }, [id]);

    return (
        <div className="container mt-5 row">
            <div className="col col-md-6">
                <div className="card" style={{ width: "18rem" }}>
                    <img src={product.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <small>Product Code: {product.code}</small>
                        <h4 className="card-text text-primary">{product.price} €</h4>
                        <p className="card-text">{product.category}</p>
                        <button className="btn ms-2 btn-outline-success" onClick={handleGoBack}>Go to Shop</button>
                    </div>
                </div>
            </div>

            <div className="col col-md-4">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default ProductDetails;