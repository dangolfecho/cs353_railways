import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCost } from "../features/userSlice";

const Box = (props) => {
    const navigate = useNavigate();
    const id = props.id;
    const tickets = props.tickets;

    const handleClick = (event) => {
        dispatch(setCost({
            c:event.target.value
        }))
        navigate("/reserve");
    }


    const dispatch = useDispatch();
    return (
        <div>
            {tickets.map((ticket, index) => (
                <div id="ticket" key={index}>
                    <p>Class: {ticket.class}</p>
                    <p>Berth: {ticket.berth}</p>
                    <p>Available: {ticket.avail}</p>
                    <p>Cost: {ticket.cost}</p>
                    <button onClick={handleClick} value={ticket.cost}>Book</button>
                </div>
            ))}
        </div>
    );
};

export default Box;