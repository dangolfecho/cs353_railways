import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "railways",
});

app.get("/", (req, res) => {
    res.json("Hello this the backend");
});

// Endpoint for fetching upcoming journeys - using username
app.get("/getTickets", async (req, res) => {
    try {
        const user = req.query.user["name"];
        const query = `SELECT ticket_id FROM pas_tickets WHERE username="${user}"`;
        const results = await new Promise((resolve, reject) => {
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (results.length === 0) {
            return res.json(["No tickets"]);
        }

        const tickets = [];
        for (let i = 0; i < results.length; i++) {
            const ticketId = results[i].ticket_id;
            const q2 = `SELECT DISTINCT from_station, to_station FROM booked_seats WHERE ticket_id=${ticketId}`;
            const seatResults = await new Promise((resolve, reject) => {
                db.query(q2, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            });
            tickets.push(seatResults);
        }

        console.log(tickets);
        res.json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/search", async (req, res) => {
    try {
        const { date: {date}, from: { from_station }, to: { to_station } } = req.query;

        const trainsQuery = `SELECT A.train_no 
                             FROM train_route A, train_route B 
                             WHERE A.train_no = B.train_no 
                             AND A.station_name = ? 
                             AND B.station_name = ?`;

        const trains = await new Promise((resolve, reject) => {
            db.query(trainsQuery, [from_station, to_station], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        if (trains.length === 0) {
            return res.json("No trains");
        }

        const results = [];
        for (const train of trains) {
            const servicesQuery = `SELECT service_id 
                                   FROM services 
                                   WHERE train_no = ? 
                                   AND date_of_journey = ?`;

            const services = await new Promise((resolve, reject) => {
                db.query(servicesQuery, [train.train_no, date], (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });

            for (const service of services) {
                const ticketsQuery = `SELECT class, berth, avail, cost 
                                      FROM tickets 
                                      WHERE service_id = ?`;

                const tickets = await new Promise((resolve, reject) => {
                    db.query(ticketsQuery, [service.service_id], (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                results.push({
                    id: service.service_id,
                    tickets: tickets
                });
                console.log(results);
            }
        }

        res.json(results);
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// get tickets - using pnr
app.get("/pnr", (req, res) => {
    const id = req.body.id;
    const query = `SELECT * FROM booked_seats WHERE ticket_id="${id}$`;
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
});

app.get("/fetchStations", (req, res) => {
    const query = `SELECT DISTINCT(station_name) FROM train_route`;
    db.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.json("Error!");
        }
        else{
            res.json(result);
        }
    })
});


// Endpoint for receiving passenger details
app.post("/registerdetails", (req, res) => {
    const passengerDetails = req.body;
    const {
        name,
        age,
        birthPreference,
        autoUpgradation
    } = passengerDetails;

    // Insert the passenger details into the database
    const query = `INSERT INTO passenger_details (name, age, gender, birth_preference, auto_upgradation, book_only_confirmed_berths) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        name,
        age,
        gender,
        birthPreference,
        autoUpgradation,
        bookOnlyConfirmedBerths,
    ];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error("Error saving passenger details:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        console.log("Passenger details saved successfully!");
        res.json({ message: "Passenger details saved successfully!" });
    });
});


app.post("/book", (req, res) => {
    const num = req.body.num;
    const user = req.body.user;

    // Get the maximum ticket ID
    const maxQuery = `SELECT MAX(ticket_id) AS maxTicketId FROM booked_seats`;
    db.query(maxQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Extract the maximum ticket ID
        const maxTicketId = result[0].maxTicketId || 0;
        // Calculate the next ticket number
        const ticketNumber = maxTicketId + 1;

        // Use Promise.all to wait for all queries to complete
        Promise.all(
            Array.from({ length: num }, (_, i) => {
                /*
                const seatQuery = `INSERT INTO booked_seats (ticket_id, seat_number, ...) VALUES (?, ?, ...)`;
                const seatValues = [ticketNumber, s_id, ...]; // Populate with appropriate values
                return new Promise((resolve, reject) => {
                    db.query(seatQuery, seatValues, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });

            */
            })
        )
        .then(() => {
            // Insert into pas_tickets table
            const ticketQuery = `INSERT INTO pas_tickets (username, ticket_id) VALUES (?, ?)`;
            const ticketValues = [user, ticketNumber];
            db.query(ticketQuery, ticketValues, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                return res.json(ticketNumber);
            });
        })
        .catch((err) => {
            return res.status(500).json({ error: err.message });
        });
    });
});


app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const q = `SELECT * FROM userinfo WHERE username = "${username}"`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        if (data.length === 0) {
            return res.json("No such account");
        } else {
            const q = `SELECT * FROM userinfo WHERE username = "${username}" AND user_password = "${password}"`;
            const vals_inner = [req.body.username, req.body.password];
            db.query(q, [vals_inner], (err, data) => {
                if (err) {
                    return res.json(err);
                }
                if (data.length === 1) {
                    return res.json("Login success");
                } else {
                    return res.json("Incorrect password");
                }
            });
        }
    });
});

app.post("/register", (req, res) => {
    const values = req.body;

    const q = `INSERT INTO userinfo VALUES("${values.username}", "${values.password}", "${values.dob}","${values.country}","${values.gender}","${values.email}","${values.mobileNumber}")`;
    console.log(q);

    db.query(q, (err, data) => {
        if(err){
            return res.json(err);
        }
        return res.json("Register success");
    });
});


app.listen(8000, () => {
    console.log("Connected to backend!");
});
