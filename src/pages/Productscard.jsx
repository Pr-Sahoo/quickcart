import React, { useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Productscard = () => {
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);

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
    transition:  "all 0.3s ease-in-out"
  });

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
                <Button variant="primary">Buy now</Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productscard;