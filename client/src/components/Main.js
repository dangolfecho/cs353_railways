import React from "react";
import Search from "./Search.js";
import Nav from "./Nav.js";
import Upcoming from "./Upcoming.js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Main = () => {
    const user = useSelector(selectUser);
    return (
        <div id="main">
        <h1>Welcome {user.name}</h1>
            <Nav />
            <br/>
            <Search />
            <br/>
            <Upcoming />
           
        </div>
    );
};

export default Main;