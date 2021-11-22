import { useEffect } from "react";
import { useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);
    return [products, setProducts];
}

export default useProducts;