import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import { selectTo, selectFrom, selectDate, selectUser} from "../features/userSlice";
import axios from 'axios';
import Box from "./Box.js";

const AvailableTickets = () => {
    const from_station = useSelector(selectFrom);
    const to_station = useSelector(selectTo);
    const date = useSelector(selectDate);
    const user = useSelector(selectUser);
    console.log(from_station, to_station, date, user);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:8000/search", {params: {date: date, from: from_station, to: to_station,}}).then(function(res){
            setData(res);
        }).catch(function (err) {
            console.log(err);
        });
    });
    return(
        <div>
            {
                data.forEach((slot, index) => {
                    <Box />
                })
            }
        </div>
    );
};

export default AvailableTickets;