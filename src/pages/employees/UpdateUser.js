import React, { useEffect } from 'react';
import "./UpdateUser.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => { 

    const{id}  = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            name: "",
            email: "",
            phone: "",
            department: "",
        });
    
        const handleInputChange = (event) => {
            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const backendUrl = process.env.REACT_APP_API_URL || 'https://employeemanager-w22t.onrender.com';

        useEffect(() => {
            const fetchEmployee = async () => {
                try {
                    const response = await fetch(`${backendUrl}/api/employee/${id}`);
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error("Error:", error);
                }

                
            }

            fetchEmployee();
        }, [id,backendUrl]);

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
                const response = await fetch(`${backendUrl}}/api/employee/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data);
                navigate("/");
            } catch (error) {
                console.error("Error:", error);
            }
        }

    return (
        <>
        <div className="center-form">
            <h1>Update Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control type="text" name="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicDepartment">
                    <Form.Control type="text" name="department" placeholder="Enter Department" value={formData.department} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100"> Update Employee</Button>
            </Form>
        </div>
        </>
    )
}

export default UpdateUser;