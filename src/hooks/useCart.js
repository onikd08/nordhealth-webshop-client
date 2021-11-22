import { useState, useEffect } from 'react';
import { getStoredCart } from '../utilities/utilities';

const useCart = products => {
    const [cart, setCart] = useState([]);

    useEffect(() => {

        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const code in savedCart) {
                const addedProduct = products.find(product => product.code === code);
                if (addedProduct) {
                    // set quantity
                    const quantity = savedCart[code];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }


    }, [products]);

    return [cart, setCart];
}

export default useCart;