import React, { useState } from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser, selectCost} from "../features/userSlice";

const PasDetails = () => {
    const user = useSelector(selectUser);
    const cost = useSelector(selectCost);
    console.log(user, cost);
    const [dis, setDis] = useState(0);
    const initialPassengerState = {
        name: "",
        age: "",
        gender: "",
        birthPreference: "",
        autoUpgradation: false,
        bookOnlyConfirmedBerths: false,
    };
    const [passengers, setPassengers] = useState([
        { ...initialPassengerState },
    ]);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [name]: newValue };
        setPassengers(newPassengers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send data to backend
            await Promise.all(
                passengers.map((passenger) =>
                    axios.post(
                        "http://localhost:8000/passenger-details",
                        passenger
                    )
                )
            );
            console.log("Passenger details submitted successfully");
            // Reset form fields
            setPassengers([{ ...initialPassengerState }]);
        } catch (error) {
            console.error("Error submitting passenger details:", error);
        }

        axios.post("http://localhost:8000/book", {num: passengers.length, user: user}).then(function(res){
            alert(`Ticket booked - ${res.data}`)
        }).catch(function(error){

        });
    };

    const handleAddPassenger = () => {
        setPassengers([...passengers, { ...initialPassengerState }]);
        const x = passengers.length+1;
        console.log(passengers.length);
        setDis(cost*x);
    };

    const handleDeletePassenger = (index) => {
        const newPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(newPassengers);
        const x = newPassengers.length+1;
        console.log(newPassengers.length);
        console.log(passengers.length);
        setDis(cost*x);
    };

    return (
        <div>
            {passengers.map((passenger, index) => (
                <div key={index}>
                    <h3>Passenger Details {index + 1}</h3>
                    <div>
                        <label>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={passenger.name}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    <div>
                        <label>Age:</label>
                        <input
                            type='number'
                            name='age'
                            value={passenger.age}
                            onChange={(e) => handleChange(e, index)}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            name='gender'
                            value={passenger.gender}
                            onChange={(e) => handleChange(e, index)}
                            required
                        >
                            <option value=''>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <div>
                        <label>Birth Preference:</label>
                        <select
                            name='birthPreference'
                            value={passenger.birthPreference}
                            onChange={(e) => handleChange(e, index)}
                            required
                        >
                            <option value=''>Select Birth Preference</option>
                            <option value='sideUpper'>Side Upper</option>
                            <option value='sideLower'>Side Lower</option>
                            <option value='lower'>Lower</option>
                            <option value='middle'>Middle</option>
                            <option value='upper'>Upper</option>
                        </select>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                name='autoUpgradation'
                                checked={passenger.autoUpgradation}
                                onChange={(e) => handleChange(e, index)}
                            />
                            Consider for auto upgradation
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='checkbox'
                                name='bookOnlyConfirmedBerths'
                                checked={passenger.bookOnlyConfirmedBerths}
                                onChange={(e) => handleChange(e, index)}
                            />
                            Book only if confirm berths are allotted
                        </label>
                    </div>
                    {index !== 0 && (
                        <button onClick={() => handleDeletePassenger(index)}>
                            Delete Passenger
                        </button>
                    )}
                </div>
            ))}
            <br />
            <button onClick={handleAddPassenger}>
                + Add Another Passenger
            </button>
            <br />
            <h2>Cost:{dis}</h2>
            <button type='submit' onClick={handleSubmit}>
                Pay and submit
            </button>
        </div>
    );
};

export default PasDetails;
