import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try{
                const res = await axios.get("http://localhost:8000/trains");
                setUsers(res.data);
                console.log(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchAllUsers();
    }, [])
    return (
        <div>
        <h1>Login page!</h1>
        {users.map(user=>(
            <div>
            <h2>{user.username}</h2>
            </div>
        ))}
        </div>
    )
};

export default Login;