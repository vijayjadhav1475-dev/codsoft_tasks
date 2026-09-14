const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Vijay@123",
    database: "codsoft_contacts"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("MySQL Database Connected!");
});

module.exports = db;