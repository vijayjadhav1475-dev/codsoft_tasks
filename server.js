const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const taskRoute = require("./routes/taskRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
    res.json({
        message: "To-Do List Backend API is running"
    });
});

const PORT = 5002;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});