import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get("/products/getproducts");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchProduct();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className='text-center mb-4'>Product List</h2>
            <div className="row justify-content-center g-4">
                {products.map((product) => (
                    // <div className='col-md-4 mb-4' key={product._id}>
                        <div className='col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center ' key={product._id}>
                        <div className="card h-100 text-center" style={{width: "100%", maxWidth: "300px"}}>
                            <img src={product.imageURL} className='card-img-top' style={{ height: "200px", objectFit: "cover" }} alt={product.name} />
                            <div className="card-body">
                                <h5 className='card-title'>{product.name}</h5>
                                <p className='card-text'>{product.description}</p>
                                <p className='card-text'><strong>Price</strong> ${product.price}</p>
                                <p className='card-text'><strong>Category</strong> ${product.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList;