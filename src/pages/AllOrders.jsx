import React, { useEffect, useState } from "react";
import axios from "axios"
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
// import Product from "../../backend/models/Product";


const AllOrders = () => {
    //State management
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    //fetch all orders from the backend
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/orders/allorders", {
                // headers: { "auth-token": localStorage.getItem("auth-token") },
                headers: {"auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODRjZDRmZmYyMjZjOWM4YmQxZTUyIn0sImlhdCI6MTczMzg0MjI3Mn0.siea1paPa3f268yRNjfrx6biXowIlsliluhp8aE1pbY"},
            });
            setOrders(response.data);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch orders: ", error);
            setError("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    // Delete order 
    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/api/orders/deleteorder/${orderId}`, {
                // headers: { "auth-token": localStorage.getItem("auth-token") },
                headers: {"auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODRjZDRmZmYyMjZjOWM4YmQxZTUyIn0sImlhdCI6MTczMzg0MjI3Mn0.siea1paPa3f268yRNjfrx6biXowIlsliluhp8aE1pbY"},
            });
            setOrders(orders.filter((order) => order._id !== orderId));
            alert("Order Deleted successfully");
        } catch (error) {
            console.error("Failed to delete order: ", error);
            setError("Failed to delete order!");
        }
    };

    // Update order status
    const updateOrderStatus = async () => {
        try {
            await axios.put(`http://localhost:5000/api/orders/updatestatus/${selectedOrders._id}`,
                { status: newStatus },
                {
                    // headers: { "auth-token": localStorage.getItem("auth-token") },
                    headers: {"auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODRjZDRmZmYyMjZjOWM4YmQxZTUyIn0sImlhdCI6MTczMzg0MjI3Mn0.siea1paPa3f268yRNjfrx6biXowIlsliluhp8aE1pbY"},
                }
            );
            setOrders(
                orders.map((order) => order._id === selectedOrders._id ? { ...order, status: newStatus } : order)
            );
            setShowModal(false);
            alert("Order status updated");
        } catch (error) {
            console.error("Failed to update order status: ", error);
            setError("Failed to update order status");
        }
    };

    // fetch orders from component mount
    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <h2>All Orders</h2>
            {loading && <Spinner animation="border" />}
            {error && <p className="text-danger">{error}</p>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.userId?.name || "Unknown"}</td>
                                <td>{order.products.map((product, idx) => (
                                    <div key={idx}>
                                        {product.productId?.name} (x{product.quantity})
                                    </div>
                                ))}
                                </td>
                                <td>${order.totalAmount}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => {
                                        setSelectedOrders(order);
                                        setNewStatus(order.status);
                                        setShowModal(true);
                                    }}>Update Status</Button>{" "}

                                    <Button variant="danger" size="sm" onClick={() => deleteOrder(order._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No Orders Available</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Update Order Status modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Select New Status</Form.Label>
                            <Form.Control as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={updateOrderStatus}>Update Status</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllOrders;