import React from 'react';
import { useHistory } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { clearTheCart, removeFromLocalStorage } from '../../utilities/utilities';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const history = useHistory();

    const handleRemove = code => {
        const newCart = cart.filter(product => product.code !== code);
        setCart(newCart);
        removeFromLocalStorage(code);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        clearTheCart();
        history.push('/placeorder');
    }

    return (
        <div className="container mt-4">
            {cart.length === 0 ?
                <h1 className="text-center">Your Cart is empty</h1> :
                <div className="row">
                    <div className="col-md-8 col-12">
                        {
                            cart.map(product => <ReviewItem
                                key={product.id}
                                product={product}
                                handleRemove={handleRemove}
                            ></ReviewItem>)
                        }
                    </div>
                    <div className="col-md-4 col-12 mb-3">
                        <Cart cart={cart}>
                            <button onClick={handlePlaceOrder} className="btn btn-outline-success">Place Order</button>
                        </Cart>
                    </div>
                </div>

            }

        </div>

    );
};


export default OrderReview;