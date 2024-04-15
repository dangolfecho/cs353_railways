import React from 'react';
import axios from 'axios';

const Payment = () => {
    const amt = 100;

    const data = {

    };

    const handleClick = () => {
        axios.post("http://localhost:8000/book", data).then(function(res){

        }).catch(function(err){

        });
    }
    return (
        <div>
        <h1>
           The amount is {amt}
           </h1>
           <button type="button" onClick={handleClick}>Pay and Book</button>
        </div>
    );
}

export default Payment;