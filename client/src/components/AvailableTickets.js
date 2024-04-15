import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectTo, selectFrom, selectDate } from "../features/userSlice";
import axios from 'axios';
import Box from "./Box.js";

const AvailableTickets = () => {
    const from_station = useSelector(selectFrom);
    const to_station = useSelector(selectTo);
    const date = useSelector(selectDate);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortByPrice, setSortByPrice] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/search", {
                    params: { date: date, from: from_station, to: to_station }
                });
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [date, from_station, to_station]);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Sorting Logic
    const sortedItems = [...currentItems].sort((a, b) => {
        if (sortByPrice) {
            return a.price - b.price;
        }
        return 0;
    });

    const handleSortByPrice = () => {
        setSortByPrice(!sortByPrice);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (data.length === 0) {
        return <h1>No trains on this route</h1>;
    }

    return (
        <div>
            <button onClick={handleSortByPrice}>Sort by Price</button>
            {sortedItems.map((item) => (
                <Box key={item.id} id={item.id} tickets={item.tickets} />
            ))}
            <div>
                {data.length > itemsPerPage && (
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                            <li key={index}>
                                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AvailableTickets;