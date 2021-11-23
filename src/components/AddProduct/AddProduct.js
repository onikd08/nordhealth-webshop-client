import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddProduct = () => {

    const history = useHistory();
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");

    const addNewProduct = async () => {
        try {
            let formField = new FormData()
            formField.append('name', name)
            formField.append('price', price)
            formField.append('description', description)
            formField.append('category', category)
            formField.append('code', code)


            formField.append('image', image)


            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/',
                data: formField
            }).then(response => {
                history.push('/home')
            })
        }
        catch (error) {
            alert(error.message + ": You must fill all the fields");
        }
    }

    return (
        <div className="container">
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Add New Product</h2>


                    <div className="form-group">
                        <label>Image</label>
                        <input
                            required
                            type="text"
                            placeholder="Image URL"
                            className="form-control"
                            onChange={(e) => setImage(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input
                            required
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Product Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            required
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Product Category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            required
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter price"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            required
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            required
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Product Code"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-outline-primary btn-block mt-2" onClick={addNewProduct}>Add Product</button>

                </div>
            </div>
        </div>
    );
};

export default AddProduct;