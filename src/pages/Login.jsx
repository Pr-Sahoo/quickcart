import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
// import { type } from '@testing-library/user-event/dist/type';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post("http://localhost:5000/api/auth/login", {email, password});
            const response = await axios.post("https://quickcart-backend-5qqz.onrender.com/api/auth/login", {email, password});
            localStorage.setItem("auth-token", response.data.authtoken);
            setMessage({type: "success", text: "Login successfully"});
        } catch (error) {
            console.error("Error Logging in: ", error);
            setMessage({type: "danger", text: error.response.data || "Login Failed!!"});
        }
    };

  return (
    <Form onSubmit={handleLogin}>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form.Group controlId='forEmail'>
            <Form.Label>Enter Email</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId='forPassword' className='mt-3'>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button variant='primary' type='submit' className='mt-3'>Submit</Button>
    </Form>
  );
};

export default Login;