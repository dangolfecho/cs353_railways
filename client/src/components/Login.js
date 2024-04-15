import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleClick = (event) => {
        navigate("/register");
    }

    const handleSubmit = () => {
        const sub_username = username;
        const sub_password = password;
        const data = {username: sub_username, password: sub_password};
        axios.post("http://localhost:8000/login", data).then(function (res) {
            if(res.data === "Login success"){
                dispatch(login({
                    name: username
                }))
                navigate("/home");
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    return (
        <div id="login">
        <h1>Welcome to Indian Railways</h1>
        <form>
        <label htmlFor="username">Enter username</label>
        <input id="username" name="username" type='text' onChange={handleUserChange}></input>
        <br/>
        <label htmlFor="password">Enter password</label>
        <input id="password" name="password" type='password' onChange={handlePasswordChange}></input>
        <br/>
        <button type="button" onClick={handleSubmit}>Login</button>
        </form>
        <h2>Click here to register if you do not have an account</h2>
        <button type="button" onClick={handleClick}>Register</button>
        </div>
    )
};

export default Login;