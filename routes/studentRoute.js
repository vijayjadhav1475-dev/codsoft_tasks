const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all students
router.get("/", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(result);
    });
});
// SEARCH students
router.get("/search", (req, res) => {
    const { name } = req.query;

    const sql = "SELECT * FROM students WHERE name LIKE ?";

    db.query(sql, [`%${name}%`], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(result);
    });
});
// FILTER students by age
router.get("/filter", (req, res) => {
    const { age } = req.query;

    const sql = "SELECT * FROM students WHERE age = ?";

    db.query(sql, [age], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(result);
    });
});
// SORT students by age
router.get("/sort", (req, res) => {
    const order = req.query.order === "desc" ? "DESC" : "ASC";

    const sql = `SELECT * FROM students ORDER BY age ${order}`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(result);
    });
});
// PAGINATION
router.get("/page", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const sql = "SELECT * FROM students LIMIT ? OFFSET ?";

    db.query(sql, [limit, offset], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            page: page,
            limit: limit,
            students: result
        });
    });
});
// GET student by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(result[0]);
    });
});
// PUT update student
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, age } = req.body;
    
    // Validation
if (!name || !email || !age) {
    return res.status(400).json({
        error: "Name, email and age are required"
    });
}

if (isNaN(age) || age <= 0) {
    return res.status(400).json({
        error: "Age must be a valid number"
    });
}

    const sql = "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?";

    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({
            message: "Student updated successfully"
        });
    });
});

// POST student
router.post("/", (req, res) => {
    console.log("CONTENT TYPE:", req.headers["content-type"]);
    console.log("BODY:", req.body);

    if (!req.body) {
        return res.status(400).json({
            error: "Request body is missing"
        });
    }

    const { name, email, age } = req.body;

    // Validation
    if (!name || !email || !age) {
        return res.status(400).json({
            error: "Name, email and age are required"
        });
    }

    if (isNaN(age) || age <= 0) {
        return res.status(400).json({
            error: "Age must be a valid number"
        });
    }

    const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Student added successfully",
            id: result.insertId
        });
    });
});

// DELETE student
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({
            message: "Student deleted successfully"
        });
    });
});
module.exports = router;
