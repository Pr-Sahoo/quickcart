import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import axios from 'axios';
import { Button, Table, Modal, Form } from 'react-bootstrap'

const Deleteprod = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);  // added now

    // state for update modal and form fields - added now
    const [showModals, setShowModals] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", price: "", imageURL: "", category: "" })

    //fetch all products form the backend 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get("/products/getproducts");
                setProducts(response.data);
            } catch (error) {
                console.error("Error in fetching products ", error);
                setError("Failed to fetch Prducts");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    //Function to delete a product 
    const handleDelete = async (productId) => {
        try {
            // const response = await axiosInstance.delete(`/products/product/${productId}`);
            // const response = await axios.delete(`http://localhost:5000/api/products/product/${productId}`, {
            const response = await axios.delete(`https://quickcart-backend-5qqz.onrender.com/api/products/product/${productId}`, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ODhlODc4ZmZmMmMzZTJiMWIwIn0sImlhdCI6MTczNDAwMDMxMH0.O5Hh1vbYavl2lApBkLTQ-wngqHvTlwuFAjCLULQ8doE",
                },
            })
            alert(response.data.msg || "Product Deleted Successfully");
            //Update the product after deletion
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Failed deleting error", error);
            setError("Failed to delete Product. please try again!")
        }
    };

    // open update modal and populate form fields - now added
    const handleUpdateClick = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            imageURL: product.imageURL,
            category: product.category,
        });
        setShowModals(true);
    };
    // handle form field changes - now added
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // submit updated product details - now added
    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.put(`products/updateproduct/${currentProduct._id}`, formData, {
            // const response = await axios.put(`http://localhost:5000/api/products/product/${currentProduct._id}`, formData, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ODM0ZDQzZTg1NzAwMThmNmVlNWM4In0sImlhdCI6MTczNDg4MjU2NX0.MgFTFxPa2azIW5cS_UvP7oyVNnZ23cbRgXU2oSNLrOg",
                },
            });
            alert(response.data.message || "Product Updated Successfully");
            // Update product list after successful update
            setProducts((prev) =>
                prev.map((product) =>
                    product._id === currentProduct._id ? { ...product, ...formData } : product
                )
            );
            setShowModals(false); // close the modal
        } catch (error) {
            console.error("Failed to update order", error);
            setError("Failed to update order please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className='mb-4'>Manage Products</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>&#8377; {product.price}</td>
                                <td>{product.category}</td>
                                <td><img src={product.imageURL} alt={product.name} style={{ "width": "50px", "height": "50px" }} /></td>
                                <td><Button variant='warning' className='me-2' onClick={() => handleUpdateClick(product)}>Update</Button>
                                    <Button variant='danger' onClick={() => handleDelete(product._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Update Modal - added now */}
            <Modal show={showModals} onHide={() => setShowModals(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name='name' value={formData.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name='description' value={formData.description} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' name='price' value={formData.price} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' name='category' value={formData.category} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>ImageURL</Form.Label>
                            <Form.Control type='text' name='imageURL' value={formData.imageURL} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModals(false)}>Cancel</Button>
                    <Button variant='primary' onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            </>
            )}
        </div>
    );
};

export default Deleteprod