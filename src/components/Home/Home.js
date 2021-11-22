import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToLocalStorage } from '../../utilities/utilities';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [sortType, setSortType] = useState('');
    const [displayProducts, setDisplayProducts] = useState([]);
    const [cart, setCart] = useCart(products);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            });

    }, []);

    useEffect(() => {
        const sortArray = type => {
            const types = {
                name: 'name',
                price: 'price'
            };
            const sortProperty = types[type];
            if (sortProperty === 'price') {
                const sorted = [...products].sort((a, b) => a[sortProperty] - b[sortProperty]);
                //setProducts(sorted);
                setDisplayProducts(sorted);
            }
            else if (sortProperty === 'name') {
                const sorted = [...products];
                sorted.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? - 1 : 0));
                //setProducts(sorted);
                setDisplayProducts(sorted);

            }
        }
        sortArray(sortType)
    }, [sortType, products])

    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.code === product.code);
        let newCart = [];
        if (exists) {
            const rest = cart.filter(pd => pd.code !== product.code);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // save to local storage 
        addToLocalStorage(product.code);

    }

    const handleSearchByName = (event) => {
        const searchText = event.target.value;

        const matchedProductsByName = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProductsByName);

    };

    const handleSearchByCode = (event) => {
        const searchText = event.target.value;
        const matchedProductsByCode = products.filter(product => product.code.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProductsByCode);

    };

    const clearField = (event) => {
        event.target.value = "";
        setDisplayProducts(products);
    };


    return (
        <div className="container mt-3">
            <div className="d-flex">
                <input onBlur={clearField} onChange={handleSearchByName} className="form-control me-2" type="search" placeholder="Search By Product Name" aria-label="Search" />
                <input onBlur={clearField} onChange={handleSearchByCode} className="form-control me-2" type="search" placeholder="Search By Product Code" aria-label="Search" />

            </div>

            <div className="mt-3 d-flex justify-content-center align-items-center">
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>
            </div>
            <div className="row mt-3">
                <div className="col-md-8 col-12">


                    {

                        displayProducts.map(product => <Product
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >

                        </Product>)
                    }
                </div>
                <div className="col-md-4 col-12 sticky-top">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn btn-outline-success">Review Your Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

        </div>
    );
};

export default Home;