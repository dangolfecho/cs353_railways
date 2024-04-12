import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import PNR from "./components/PNR.js";
import Main from "./components/Main.js";
import Search from "./components/Search.js";
import Reservation from "./components/Reservation.js";
import Tickets from "./components/Tickets.js";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/pnr' element={<PNR />} />
                    <Route path='/home' element={<Main />} />
                    <Route path='/tickets' element={<Tickets />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/reserve' element={<Reservation />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
