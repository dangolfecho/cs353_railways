import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingJourney = () => {
    const [upcomingJourneys, setUpcomingJourneys] = useState([]);

    useEffect(() => {
        const fetchUpcomingJourneys = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/upcoming-journeys"
                );
                setUpcomingJourneys(response.data);
            } catch (error) {
                console.error("Error fetching upcoming journeys:", error);
            }
        };

        fetchUpcomingJourneys();
    }, []);

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
