import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        const sub_username = username;
        const sub_password = password;
        axios.post("http://localhost:8000/login", {
            username: sub_username,
            password: sub_password
        }).then(function (res) {
            console.log(res); 
        }).catch(function(error){
            console.log(error);
        })
    }
    return (
        <div>
        <h1>Login page</h1>
        <label for="username">Enter your username</label>
        <input id="username" name="username" type='text' onChange={handleUserChange}></input>
        <br/>
        <label for="password">Enter your password</label>
        <input id="password" name="password" type='password' onChange={handlePasswordChange}></input>
        <br/>
        <button type="submit" onClick={handleSubmit}>Login</button>
        </div>
    )
};

export default Login;