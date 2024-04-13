import React from 'react';
import {useNavigate} from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        navigate("/tickets");
    };

    return (
        <div>
            <h1>Navbar</h1>
            <button onClick={handleClick}>My Tickets</button>
        </div>
    );
}

export default Nav;