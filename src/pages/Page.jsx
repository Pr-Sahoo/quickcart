
import React, { useState, useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import { Alert, Table, Button } from "react-bootstrap";
import axios from "axios";

const Page = () => {
    const { basket, removeFromBasket, clearBasket } = useContext(BasketContext);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [error, setError] = useState("");

    //Calculate total amount
    const totalAmount = basket.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    // Handle order creation 
    const handleCreateOrder = async () => {
        const orderData = {
            products: basket.map((item) => ({
                // productId: item._id,   // backend need _id to identify the product
                productId: item.productId,
                quantity: item.quantity,
            })),
            totalAmount,
        };
        console.log(orderData);
        try {
            // const response = await axiosInstance.post("/orders/createorder", orderData);
            // const response = await axios.post("http://localhost:5000/api/orders/createorder", orderData, {
            const response = await axios.post("https://quickcart-backend-5qqz.onrender.com/api/orders/createorder", orderData, {
                headers: {
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODRjZDRmZmYyMjZjOWM4YmQxZTUyIn0sImlhdCI6MTczMzg0MjI3Mn0.siea1paPa3f268yRNjfrx6biXowIlsliluhp8aE1pbY",
                },
            });
            if (response.status === 201) {
                setOrderSuccess(true);
                setError("");  // clear any previous error
                clearBasket(); // clear basket after successfull order
            } else {
                setError("Failed to create order. please try again");
            }
        } catch (error) {
            console.error("Error creating: ", error);
            setError(error.response?.data?.message || "An error occured while creating the order");
            // setOrderSuccess(false);
        }
    };

    return(
        <div className="container mt-4">
            <h2 className="text-center">Your Cart</h2>
            {/* Success message*/}
            {orderSuccess && <Alert variant="success" onClose={() => setOrderSuccess(false)} dismissible>Order created Successfully</Alert>}
            {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
            {/* if basket is empty */}
            {basket.length === 0 ? (
                <p className="text-center">Your Cart is Empty</p>
            ): (
                <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {basket.map((item) => (
                            <tr key={item.productId}>
                                <td>{item.name}</td>
                                <td>&#8377; {item.price}</td>
                                <td>{item.quantity}</td>
                                <td>&#8377; {item.price * item.quantity}</td>
                                <td><Button variant="danger" size="sm" onClick={() => removeFromBasket(item.productId)}>Remove</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="text-right">
                    <h4>Total Amount: &#8377; {totalAmount}</h4>
                    <Button variant="success" onClick={handleCreateOrder} disabled={basket.length === 0}>Confirm Order</Button>
                </div>
                </>
            )}
        </div>
    );
};

export default Page;