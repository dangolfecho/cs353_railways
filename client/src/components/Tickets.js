import React, { useState,  useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";

const Tickets = () => {
    const username = useSelector(selectUser);
    const [ticketsData, setTicketsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const params = { user: username };
                const res = await axios.get('http://localhost:8000/getTickets', { params });
                setTicketsData(res.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (ticketsData.length === 0) {
        return <div>No booked tickets!</div>;
    }

    return (
        <div>
            {ticketsData.map((ticket, index) => (
                <div>
                <h1>Ticket:{index+1}</h1>
                <div id="mytickets" key={index}>
                    <p>Train_no: {ticket[index]["from_station"]}</p>
                    <p>PNR: {ticket[index]["to_station"]}</p>
                </div>
                </div>
            ))}
        </div>
    );
};

export default Tickets;
