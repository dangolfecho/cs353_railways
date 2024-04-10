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

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const q = `SELECT * FROM userinfo WHERE username = "${username}"`;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err);
        }
        if(data.length === 0){
            return res.json("No such account");
        }
        else{
            const q = `SELECT * FROM userinfo WHERE username = "${username}" AND password = "${password}"`;
            const vals_inner = [req.body.username, req.body.password];
            db.query(q, [vals_inner], (err, data) => {
                if(err){
                    return res.json(err);
                }
                if(data.length === 1){
                    return res.json("Login success");
                }
                else{
                    return res.json("Incorrect password");
                }
            })
        }
    });
});

app.listen(8000, () => {
    console.log("Connected to backend!");
});