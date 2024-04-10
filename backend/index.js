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

app.get("/login", (req, res) => {
    const q = "SELECT * FROM userinfo WHERE username=`usr`";

    const vals = [req.body.username];
    db.query(q, [vals], (err, data) => {
        if(err){
            return res.json(err);
        }
        if(data.length === 0){
            return res.json("No such account");
        }
        else{
            const q = "SELECT * FROM userinfo WHERE username=`usr` AND password=`pass`";
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