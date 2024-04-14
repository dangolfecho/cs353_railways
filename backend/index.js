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
app.get("/getTickets", (req, res) => {
    const user = req.body.user;
    const query = `SELECT (ticket_id) FROM pas_tickets WHERE username="${user}"`; // Database schema must contain upcoming_journeys
    db.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching upcoming journeys:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        if(results.length === 0){
            res.json(["No tickets"]);
        }
        else{
            res.json(results);
        }
    });
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
    var q = `SELECT MAX(ticket_id) FROM booked_seats`;
    var t_no = 1;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err);
        }
        else{
            t_no += data;
        }
    })
    for(var i=1;i<=num;i+=1){
        const x = `INSERT INTO booked_seats VALUES (${t_no},${s_id}, ${i}, ${age}, ${aadhar},"${from_station}","${to_station}","${p_name}")`;
        db.query(x, (err, data) => {
            if(err){
                return res.json(err);
            }
        })
    }
    const y = `INSERT INTO pas_tickets VALUES("${user}", ${t_no})`;
    db.query(y, (err, data) => {
        if(err){
            return res.json(err);
        }
    })
    return res.json(t_no);
})


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
