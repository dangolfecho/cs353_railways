import React from "react";
import Search from "./Search.js";
import Nav from "./Nav.js";
import Upcoming from "./Upcoming.js";

const Main = () => {
    return (
        <div>
            <Nav />
            <Search />
            <Upcoming />
        </div>
    );
};

export default Main;