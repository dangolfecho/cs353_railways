import axios from 'axios';
import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {selectTrain} from "../features/userSlice";
import Select from "react-select";

const Preference = () => {
    const train_no = useSelector(selectTrain);
    const [preference, setPreference] = useState("");
    const [data, setData] = useState([]);
    axios.get("http://localhost:8000/preferences", {params: {id:train_no}}).then(function (result){
        var temp = [];
        for(var i=0;i<result.data.length;i++){
            temp.push({"value": result.data[i]['berth'], "label": result.data[i]['berth']});
        }
        setData(temp);
    }).catch(function(error){
        console.log(error);
    });
    return (
        <div>
            <label for="preference">Select your preference</label>
            <Select name='preference' id='preference'
                defaultValue={preference}
                onChange={setPreference}
                options={data}
            />
        </div>
    );
}

export default Preference;