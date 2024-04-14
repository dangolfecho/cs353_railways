import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const UpcomingJourney = () => {
    const [upcomingJourneys, setUpcomingJourneys] = useState([]);

    const username = useSelector(selectUser);
    useEffect(() => {
        axios.get("http://localhost:8000/getTickets", {params: {id: username}})
        .then(function (result) {
            setUpcomingJourneys(result.data);
        }).catch(function (err){
            console.log(err);
        });
    }, [username]);

    if(upcomingJourneys[0] === "No tickets"){
        return(
            <h1>No upcoming journeys!</h1>
        );
    }

    return (
        <div>
            <h2>Upcoming Journeys</h2>
            <ul>
                {upcomingJourneys.map((journey) => (
                    <li key={journey.id}>
                        <p>Train Name: {journey.trainName}</p>
                        <p>Departure Time: {journey.departureTime}</p>
                        <p>Arrival Time: {journey.arrivalTime}</p>
                        <p>From: {journey.fromStation}</p>
                        <p>To: {journey.toStation}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingJourney;
