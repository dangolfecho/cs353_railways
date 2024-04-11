import React from "react";
import PasDetails from "./PasDetails.js";
import Preference from "./Preference.js"
import Contact from "./Contact.js";
import Payment from "./Payment.js";

const Reservation = () => {
    return (
        <div>
            <PasDetails />
            <Preference />
            <Contact />
            <Payment />
        </div>
    );
};

export default Reservation;