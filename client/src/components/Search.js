import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [stations, setStations] = useState([]);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const [date, setDate] = useState("");

    const navigate = useNavigate();
    const handleClick = (event) =>{
        axios.post("http://localhost:8000/search", {params: {date: date, from: selectedFrom, to: selectedTo,}}).then(function(res){
            navigate("avail");
        }).catch(function (err) {
            console.log(err);
        });
    }
    useEffect(() =>{
    axios.get("http://localhost:8000/fetchStations").then(function (res) {
        setStations(res.data);
        console.log(res.data);
    }).catch(function (err){
       alert("Error in fetching stations! Try again"); 
    });
    }, []);

    return (
        <div id="search">
            <label for="from">From</label>
            <Select name='from' id='from'
                defaultValue={selectedFrom}
                onChange={setSelectedFrom}
                options={stations}
            />
            <label for="to">To</label>
            <Select name='to' id='to'
                defaultValue={selectedTo}
                onChange={setSelectedTo}
                options={stations}
            />
            <label for="date">Date: </label>
            <input name="date" type="date" onChange={setDate}></input>
            <br></br>
            <button type="button" onClick={handleClick}>Search</button>
        </div>
    );
};

export default Search;