import React from 'react';
import ModifySearch from "./ModifySearch.js";
import Filter from "./Filter.js";
import Sort from "./Sort.js"

const AvailableTickets = (props) => {
    return(
        <div>
            <ModifySearch />
            <Filter />
            <Sort />
        </div>
    );
};

export default AvailableTickets;