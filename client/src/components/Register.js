import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const AccountCreationForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        dob: "",
        country: "",
        gender: "",
        email: "",
        mobileNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return false;
        }
        // Add additional validation for other fields if needed
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
        axios.post("http://localhost:8000/register", formData).then(function (res) {
            if(res.data === "Register success"){
                console.log("HI");
                navigate("/home");
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    };

    const {
        username,
        password,
        confirmPassword,
        dob,
        country,
        gender,
        email,
        mobileNumber,
    } = formData;

    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {password !== confirmPassword && (
                        <p>Passwords do not match!</p>
                    )}
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type='date'
                        name='dob'
                        value={dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type='text'
                        name='country'
                        value={country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select
                        name='gender'
                        value={gender}
                        onChange={handleChange}
                        required
                    >
                        <option value=''>Select</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                    </select>
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type='tel'
                        name='mobileNumber'
                        value={mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    );
};

export default AccountCreationForm;
