import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const UpcomingJourney = () => {
    const [upcomingJourneys, setUpcomingJourneys] = useState([]);

    const username = useSelector(selectUser);
    useEffect(() => {
        axios.get("http://localhost:8000/getTickets", {params: {user: username}})
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
                        <p>From: {journey[0]["from_station"]}</p>
                        <p>To: {journey[0]["to_station"]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingJourney;
