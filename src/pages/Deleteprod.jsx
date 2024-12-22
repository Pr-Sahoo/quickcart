import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import axios from 'axios';
import { Button, Table } from 'react-bootstrap'

const Deleteprod = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    //fetch all products form the backend 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/products/getproducts");
                setProducts(response.data);
            } catch (error) {
                console.error("Error in fetching products ", error);
                setError("Failed to fetch Prducts");
            }
        }
        fetchProducts();
    }, []);
    // "http://localhost:5000/api/products/createproduct", formdata, {
    //             headers: {
    //                 "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ODhlODc4ZmZmMmMzZTJiMWIwIn0sImlhdCI6MTczNDAwMDMxMH0.O5Hh1vbYavl2lApBkLTQ-wngqHvTlwuFAjCLULQ8doE",
    //             },

    //Function to delete a product 
    const handleDelete = async (productId) => {
        try {
            // const response = await axiosInstance.delete(`/products/product/${productId}`);
            const response = await axios.delete(`http://localhost:5000/api/products/product/${productId}`, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ODhlODc4ZmZmMmMzZTJiMWIwIn0sImlhdCI6MTczNDAwMDMxMH0.O5Hh1vbYavl2lApBkLTQ-wngqHvTlwuFAjCLULQ8doE",
                },
            })
            alert(response.data.msg || "Product Deleted Successfully");
            //Update the product after deletion
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Failed deleting error", error);
            setError("Failed to delete Product.")
        }
    };

    return (
        <div className="container mt-5">
            <h2 className='mb-4'>Delete Products</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <Table striped bordered hover>
                <thead>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>&#8377; {product.price}</td>
                            <td><Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Deleteprod