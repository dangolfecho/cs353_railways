import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Register from "./components/Register.js";
import Pnr from "./components/Pnr.js";
import Main from "./components/Main.js";
import Search from "./components/Search.js";
import Reservation from "./components/Reservation.js";
function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/pnr' element={<Pnr />} />
                    <Route path='/home' element={<Main />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/reserve' element={<Reservation />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
