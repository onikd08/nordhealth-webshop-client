import React from 'react';

const ReviewItem = (props) => {
    const { name, price, quantity, code, image } = props.product;
    const { handleRemove } = props;
    return (
        <div className="card mb-3" style={{ maxWidth: "340px" }}>
            <img src={image} className="card-img-top" alt="..." />
            <div className="card-body text-center">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Price: {price}</p>
                <p className="card-text">Quantity: {quantity}</p>
                <button onClick={() => handleRemove(code)} className="btn btn-outline-danger">Remove</button>
            </div>
        </div>


    );
};

export default ReviewItem;