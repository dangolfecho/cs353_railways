import React from 'react';
import MiniBox from "./MiniBox.js";
import {useNavigate} from "react-router-dom";

const Box = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        navigate("/reserve");
    }
    return (
        <div>
        <MiniBox/>
        </div>
    );
};

export default Box;