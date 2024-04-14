import React from "react";
import Search from "./Search.js";
import Nav from "./Nav.js";
import Upcoming from "./Upcoming.js";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Main = () => {
    const user = useSelector(selectUser);
    console.log(user.name);
    return (
        <div>
        <h1>{user.name}</h1>
            <Nav />
            <Search />
            <Upcoming />
           
        </div>
    );
};

export default Main;