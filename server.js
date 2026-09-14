const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const contactRoute = require("./routes/contactRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRoute);

app.get("/", (req, res) => {
    res.json({
        message: "Contact Management System API is running"
    });
});

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});