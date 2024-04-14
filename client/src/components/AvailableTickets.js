import React, { useEffect, useState } from 'react';
import ModifySearch from "./ModifySearch.js";
import Filter from "./Filter.js";
import Sort from "./Sort.js"

import { useSelector } from "react-redux";
import { selectTo} from "../features/userSlice";
import { selectFrom } from "../features/userSlice";
import { selectDate } from "../features/userSlice";
import axios from 'axios';
import Box from "./Box.js";

const AvailableTickets = (props) => {
    const from_station = useSelector(selectFrom);
    const to_station = useSelector(selectTo);
    const date = useSelector(selectDate);
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
            <ModifySearch />
            <Filter />
            <Sort />
            {
                data.forEach((slot, index) => {
                    <Box />
                })
            }
        </div>
    );
};

export default AvailableTickets;