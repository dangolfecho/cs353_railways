import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectTo, selectFrom, selectDate } from "../features/userSlice";
import axios from 'axios';
import Box from "./Box.js";

const AvailableTickets = () => {
    const from_station = useSelector(selectFrom);
    const to_station = useSelector(selectTo);
    const date = useSelector(selectDate);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/search", {
                    params: { date: date, from: from_station, to: to_station }
                });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [date, from_station, to_station]);

    if (data.length === 0) {
        return <h1>No trains on this route</h1>;
    }

    return (
        <div>
            <Box id={data[0]["id"]} tickets={data[0]["tickets"]} />
        </div>
    );
};

export default AvailableTickets;