import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        const sub_username = username;
        const sub_password = password;
        const data = {username: sub_username, password: sub_password};
        axios.post("http://localhost:8000/login", data).then(function (res) {
            if(res.data === "Login success"){
                console.log("HI");
                navigate("/main")
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    return (
        <div>
        <h1>Login page</h1>
        <form>
        <label htmlFor="username">Enter your username</label>
        <input id="username" name="username" type='text' onChange={handleUserChange}></input>
        <br/>
        <label htmlFor="password">Enter your password</label>
        <input id="password" name="password" type='password' onChange={handlePasswordChange}></input>
        <br/>
        <button type="button" onClick={handleSubmit}>Login</button>
        </form>
        </div>
    )
};

export default Login;