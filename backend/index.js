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

app.get("/trains", (req, res) => {
    const q = "SELECT * FROM userinfo";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err);
        }
        return res.json(data);
    });
});

app.listen(8000, () => {
    console.log("Connected to backend!");
});