import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
// import { type } from "@testing-library/user-event/dist/type";

const SignUp = () => {
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post("http://localhost:5000/api/auth/createuser", {
            const response = await axios.post("https://quickcart-backend-5qqz.onrender.com/api/auth/createuser", {
                name,
                email,
                password,
            })
            setMessage({ type: "success", message: response.data, text: "Account created successfully"});
        } catch (error) {
            console.error("Error creating account: ", error);
            setMessage({type: "danger", text: error.response.data || "SignUp failed"});
        }
    };

    return(
            <Form onSubmit={handleSignUp}>
                {message && <Alert variant={message.type}>{message.text}</Alert>}

                <Form.Group controlId="formName">
                    <Form.Label>Form Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Enter Your Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">SignUp</Button>
            </Form>
    );
};

export default SignUp;