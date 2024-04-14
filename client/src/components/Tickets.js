import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext.js';
import axios from 'axios';

const Tickets = () => {
    const { username } = useContext(UserContext);
    const [ticketsData, setTicketsData] = useState([]);


    useEffect(() => {
        const params = {
            user: username,
        }
        axios.get('http://localhost:8000/getTickets', {params}).then(function(res) {
            setTicketsData(res);
        }).catch( function (error) {
            console.log(error);
        });
    });

    return (
        <div>
        Your tickets should be displayed here!
        {ticketsData.map((ticket, index) => (
            <div key={index}>
                <p>Train_no: </p>
                <p>PNR: </p>
                <p>Passenger: </p>
                <ul>
                    {ticketsData.passengers.map((passenger, passengerIndex) => (
                        <li key={passengerIndex}>
                            Passenger Name: {passenger.name}
                        </li>
                    ) )}
                </ul>

            </div>
        ))}
        </div>
    );
}

export default Tickets;