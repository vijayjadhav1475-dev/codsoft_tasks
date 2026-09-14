const db = require("../config/db");

const createStudent = (req, res) => {
    const { name, email, phone, age } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const sql = "INSERT INTO students (name, email, phone, age) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone, age], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error creating student",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Student created successfully",
            studentId: result.insertId
        });
    });
};

module.exports = {
    createStudent
};