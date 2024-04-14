import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTo, setFrom, setDate } from "../features/userSlice";

const Search = () => {
    const [stations, setStations] = useState([]);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const [bookDate, setBookDate] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (event) =>{
        dispatch(setTo({
            to_station:selectedTo
        }))
        dispatch(setFrom({
            from_station:selectedFrom
        }))
        dispatch(setDate({
            date:bookDate
        }))
        navigate("/avail");
    }

    const handleChange = (event) => {
        setBookDate(event.target.value);
    }
    useEffect(() =>{
    axios.get("http://localhost:8000/fetchStations").then(function (res) {
        var temp = [];
        for(var i=0;i<res.data.length;i++){
            temp.push({"value": res.data[i]['station_name'], "label": res.data[i]['station_name']});
            setStations(temp);
        }
    }).catch(function (err){
       alert("Error in fetching stations! Try again"); 
    });
    }, []);

    return (
        <div id="search">
            <label for="from">From</label>
            <Select name='from' id='from'
                defaultValue={selectedFrom}
                onChange={(choice) => setSelectedFrom(choice.value)}
                options={stations}
            />
            <label for="to">To</label>
            <Select name='to' id='to'
                defaultValue={selectedTo}
                onChange={(choice) => setSelectedTo(choice.value)}
                options={stations}
            />
            <label for="date">Date: </label>
            <input name="date" type="date" onChange={handleChange}></input>
            <br></br>
            <button type="button" onClick={handleClick}>Search</button>
        </div>
    );
};

export default Search;