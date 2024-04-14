import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectPnr } from "../features/userSlice";

const Display = () => {

    const pnr_id = useSelector(selectPnr);
    const [data, setData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        axios.get("http://localhost:8000/pnr", { params: {id: pnr_id}} ).then (function (res) {
            setData(res);
        }).catch(function(error){
            console.log(error);
        })};

        fetchData();
    }, [pnr_id]);

    return (
        <div>
        <h1>Ticket</h1>
        <h2>Pnr:{pnr_id}</h2>
        <h3>{data}</h3>
        </div>
    );
};

export default Display;