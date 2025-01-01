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
  const{addToBasket} = useContext(BasketContext);

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

  // Handle quantity change 
  // const handleQuantityChange = (e) => {
  //   const value = Math.max(1, parseInt(e.target.value) || 1)  // ensure the quantity is atleast one
  //   setQuantity(value);
  // }
  const handleQuantityChange = (productId, value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1); // ensure the quantity is atleast one
    setQuantity((prev) => ({...prev, [productId]: newQuantity}));
  };
  // Add Product to cart and add new product to cart via api hit
  // const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODRjZDRmZmYyMjZjOWM4YmQxZTUyIn0sImlhdCI6MTczMzg0MjI3Mn0.siea1paPa3f268yRNjfrx6biXowIlsliluhp8aE1pbY";
  // const handleAddToCart = async (product) => {
    // const orderData = {
    //   productId: product._id,
    //   // name: product.name,
    //   price: product.price,
    //   quantity,
    //   totalAmount: product.price * quantity
    // };
  //   const orderData = {  // this order data is created by the co pilot 
  //     products: [
  //       {
  //         productId: product._id,
  //         quantity,
  //       },
  //     ],
  //     totalAmount: product.price * quantity,
  //   };
  //   try {
  //     //Api call to create order
  //     const response = await axios.post("http://localhost:5000/api/orders/createorder", orderData, {
  //       headers: {
  //         // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODRjZDRmZmYyMjZjOWM4YmQxZTUyIn0sImlhdCI6MTczMzg0MjI3Mn0.siea1paPa3f268yRNjfrx6biXowIlsliluhp8aE1pbY",
  //         "auth-token" : AuthToken
  //       }
  //     });
  //     if(response.status === 201) {
  //       alert(`${product.name} added to your cart. Quantity: ${quantity}. Order created successfully`);
  //     } else {
  //       console.error("error response: ", response.status, response.data); // log the response status and data
  //       alert("Something went wrog while creating the Order");
  //     }
  //   } catch (error) {
  //       // console.error("Failed to create order: ", error);
  //       alert("Failed to create order please try again");
  //       if(error.response) {
  //         console.error("Error creating order: ", error.response.data);
  //       }else {
  //         console.error("error creating order: ", error.message);
  //       }
  //   }
  // }

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
    <div className="container">
      <h2 className='text-center mb-4'>Product list</h2>
      <div className="row">
        {products.map((products) =>
          <div className="col-md-4 mb-4" key={products._id} onMouseEnter={() => setHovered(products._id)} onMouseLeave={() => setHovered(null)} >
            <Card style={{ ...cardStyle(hovered === products._id), width: '18rem' }} className='h-100'>
              <Card.Img variant="top" src={products.imageURL} alt={products.name} style={{ height: "200px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{products.name}</Card.Title>
                <Card.Text>{products.description}</Card.Text>
                <Card.Text><strong>Price: &#8377;</strong> {products.price}</Card.Text>
                <Card.Text><strong>Category: </strong>{products.category}</Card.Text>

                {/* Quantity selector */}
                <div className="mb-2">
                  {/* <label htmlFor="quantity" className='mr-2'>Quantity:</label> */}
                  <label htmlFor={`quantity-${products._id}`} className='mr-2'>Quantity:</label>
                  {/* <input type='number' value={quantity} onChange={handleQuantityChange} min={1} className='form-control' style={{width: "60px", display: "inline-block"}}/> */}
                  <input className='form-control' style={{width: "60px", display: "inline-block"}} type="number" id={`quantity-${products._id}`} value={quantity[products._id] || 1} onChange={(e) => handleQuantityChange(products._id, e.target.value)} min={1}  />
                </div>
                {/* <Button variant="primary" onClick={() => handleAddToCart(products)}>Buy now</Button> */}
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