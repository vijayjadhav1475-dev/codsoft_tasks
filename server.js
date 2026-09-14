const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const studentRoute = require("./routes/studentRoute");

app.use("/api/students", studentRoute);

app.get("/", (req, res) => {
    res.json({ message: "CodSoft Backend API is running" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});