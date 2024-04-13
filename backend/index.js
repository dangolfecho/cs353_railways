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

// Endpoint for fetching upcoming journeys
app.get("/upcoming-journeys", (req, res) => {
    const query = "SELECT * FROM upcoming_journeys"; // Database schema must contain upcoming_journeys
    db.query(query, (error, results) => {
        if (error) {
            console.error("Error fetching upcoming journeys:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        res.json(results);
    });
});

// Endpoint for receiving passenger details
app.post("/registerdetails", (req, res) => {
    const passengerDetails = req.body;
    const {
        name,
        age,
        gender,
        birthPreference,
        autoUpgradation,
        bookOnlyConfirmedBerths,
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
            const q = `SELECT * FROM userinfo WHERE username = "${username}" AND password = "${password}"`;
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
