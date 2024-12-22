import React, {useState, useEffect} from 'react';
import axiosInstance from "../utils/axiosInstance";
import axios from 'axios';

const Cartmanage = () => {
    const [cartItem, setCartItem] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                setLoading(true);
                // const response = await axiosInstance.get("/orders/cart");
                const response = await axios.get("http://localhost:5000/api/orders/allorders")
                setCartItem(response.data.products);
                calculateTotal(response.data.products);
            } catch (error) {
                setError("Failed to fetch cart details");
            } finally{
                setLoading(false);
            }
        };
        fetchCartData();
    },[]);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        setTotalAmount(total);
    };

    const handleOrderSubmit = async () => {
        try {
            const orderData = {
                products: cartItem.map((item) => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                })),
                totalAmount,
            }
            const response = await axiosInstance.post("/orders/create", orderData);
            alert("Order Created Successfully");
            console.log(response.data);
        } catch (error) {
            console.error("Order creation failed:", error);
            setError("Order creation failed");
        }
    };

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error}</div>;
  return (
    <div className="container mt-5">
        <h1>Your Cart</h1>
        <table className='table table-striped mt-3'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                </tr>
            </thead>
            <tbody>
                {cartItem.map((item) =>(
                <tr key={item.product._id}>
                    <td>{item.product.name}</td>
                    <td>&#8377; {item.product.price}</td>
                    <td>{item.quantity}</td>
                    <td>&#8377; {item.quantity * item.product.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <h3 className='mt-4'>Total: &#8377;{totalAmount}</h3>
        <button className='btn btn-primary mt-3' onClick={handleOrderSubmit}>Place Order</button>
    </div>
  );
};

export default Cartmanage