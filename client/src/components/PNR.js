import React, { useState } from "react";
import axios from "axios";

const Pnr = () => {

    const [pnr, setPnr] = useState("");
    const [ticketDetails, setTicketDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setPnr(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/pnr?id=${pnr}`);
            setTicketDetails(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pnr">Enter your PNR number</label>
                <input id="pnr" name="pnr" type="text" value={pnr} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {ticketDetails && (
                <div>
                    <h2>Ticket Details</h2>
                    <p>PNR: {ticketDetails[0]["ticket_id"]}</p>
                    <p>From station: {ticketDetails[0]["from_station"]}</p>
                    <p>To station: {ticketDetails[0]["to_station"]}</p>
                </div>
            )}
        </div>
    );
};

export default Pnr;
