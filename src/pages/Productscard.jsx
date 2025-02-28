import React, { useState, useEffect, useContext } from 'react'
import axiosInstance from '../utils/axiosInstance';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import axios from 'axios';
import { BasketContext } from '../context/BasketContext';
// import { Prev } from 'react-bootstrap/esm/PageItem';

const Productscard = () => {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [quantity, setQuantity] = useState({}); // set quantity for all products
  const { addToBasket } = useContext(BasketContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/getproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error in fetching products ", error);
      }
    }
    fetchProducts();
  }, []);

  const cardStyle = (isHovered) => ({
    boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    transition: "all 0.3s ease-in-out"
  });

  const handleQuantityChange = (productId, value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1); // ensure the quantity is atleast one
    setQuantity((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const handleAddToBasket = (product) => {
    const productQuantity = quantity[product._id] || 1; // quantity defualt to 1 if no quantity selected
    addToBasket({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: productQuantity,
      totalAmount: product.price * productQuantity
    });
    alert(`${product.name} added to your cart. Quantity: ${productQuantity}`);
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className='text-center'>Welcome to QuickCart</h1>
      <h2 className='text-center mb-4'>Product list</h2>
      {/* <div className="row d-flex justify-content-center flex-wrap g-4"> */}
      <div className='row justify-content-center g-4'>
        {products.map((products) =>
          <div className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={products._id} onMouseEnter={() => setHovered(products._id)} onMouseLeave={() => setHovered(null)} >
            <Card style={{ ...cardStyle(hovered === products._id), width: '18rem' }} className='h-100'>
              <Card.Img variant="top" src={products.imageURL} alt={products.name} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{products.name}</Card.Title>
                <Card.Text>{products.description}</Card.Text>
                <Card.Text><strong>Price: &#8377;</strong> {products.price}</Card.Text>
                <Card.Text><strong>Category: </strong>{products.category}</Card.Text>

                {/* Quantity selector */}
                <div className="mb-2">
                  <label htmlFor={`quantity-${products._id}`} className='mr-2'>Quantity:</label>
                  <input className='form-control' style={{ width: "60px", display: "inline-block" }} type="number" id={`quantity-${products._id}`} value={quantity[products._id] || 1} onChange={(e) => handleQuantityChange(products._id, e.target.value)} min={1} />
                </div>
                <Button variant='primary' onClick={() => handleAddToBasket(products)}>Add to basket</Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productscard;