import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PnrContext } from "./PnrContext.js";

const Pnr = () => {
    const navigate = useNavigate();

    const [pnr, setPnr] = useState("");
    const { setPnr: setPnrContext} = useContext(PnrContext);

    const handleClick = (event) => {
        setPnrContext(pnr);
        navigate("display");
    };

    return (
        <div>
            <label for="pnr">Enter your PNR number</label>
            <input id="pnr" name="pnr" type="text" onChange={setPnr}></input>
            <button onClick={handleClick}>Submit</button>
        </div>
    );
};

export default Pnr;