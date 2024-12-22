import React, {useState} from 'react'
// import axiosInstance from '../utils/axiosInstance'
import axios from 'axios';

const CreateProduct = () => {
    const [formdata, setFormdata] = useState({
        name: "",
        description: "",
        price: "",
        imageURL: "",
        category: "",
    });

    const [message, setMessage] = useState("");

    // const handleChange = (e) => {
    //     setFormdata({
    //         ...formdata,
    //         [e.target.name]: e.target.value,
    //     });
    // };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormdata((prev) => ({...prev, [name]: value}));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axiosInstance.post("/products/createproduct", formdata);
    //         alert("product created successfully");
    //         console.log(response.data);
    //     } catch(error) {
    //         console.error("Error creating product: ", error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/products/createproduct", formdata, {
                headers: {
                    "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YWE5ODhlODc4ZmZmMmMzZTJiMWIwIn0sImlhdCI6MTczNDAwMDMxMH0.O5Hh1vbYavl2lApBkLTQ-wngqHvTlwuFAjCLULQ8doE",
                },
            });
            setMessage("Product created successfully!");
            setFormdata({
                name: "",
                description: "",
                price: "",
                imageURL: "",
                category: "",
            });
            console.log(res.data);
        } catch(error) {
            console.error(error);
            setMessage("Failed to create product.");
        }
    };

  return (
    <div className="container mt-4">
        <h2>Create product</h2>
        {message && <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>{message}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label label="form-label">Name</label>
                <input type="text" className="form-control" name='name' value={formdata.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label label="form-label">Description</label>
                <textarea className='form-control' name="description" value={formdata.description} onChange={handleChange} required ></textarea>
            </div>
            <div className="mb-3">
                <label label="form-label">Price</label>
                <input type="number" className='form-control' name='price' value={formdata.price} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label label="form-label">Image URL</label>
                <input type="text" className='form-control' name='imageURL' value={formdata.imageURL} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label label='form-label'>Category</label>
                <input type="text" className='form-control' name='category' value={formdata.category} onChange={handleChange} />
            </div>
            <button type='submit' className='btn btn-primary'>Create Product</button>
        </form>
    </div>
  );
};

export default CreateProduct;