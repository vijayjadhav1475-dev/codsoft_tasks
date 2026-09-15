const express = require("express");
const router = express.Router();
const db = require("../config/db");
const taskController = require("../controllers/taskController");

// GET all tasks - Search, Filter, Sort, Pagination
router.get("/", taskController.getAllTasks);

// POST - Add new task
router.post("/", (req, res) => {
    const {
        title,
        description,
        status,
        due_date,
        priority,
        category
    } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    const taskStatus = status || "pending";
    const taskPriority = priority || "medium";

    if (!["pending", "completed"].includes(taskStatus)) {
        return res.status(400).json({
            error: "Status must be pending or completed"
        });
    }

    if (!["low", "medium", "high"].includes(taskPriority)) {
        return res.status(400).json({
            error: "Priority must be low, medium or high"
        });
    }

    const sql = `
        INSERT INTO tasks
        (title, description, status, due_date, priority, category)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            description || null,
            taskStatus,
            due_date || null,
            taskPriority,
            category || null
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Failed to add task"
                });
            }

            res.status(201).json({
                message: "Task added successfully",
                id: result.insertId
            });
        }
    );
});

// GET task by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch task"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(200).json(result[0]);
    });
});

// PUT - Update task
router.put("/:id", (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        status,
        due_date,
        priority,
        category
    } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Task title is required"
        });
    }

    if (status && !["pending", "completed"].includes(status)) {
        return res.status(400).json({
            error: "Status must be pending or completed"
        });
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
            error: "Priority must be low, medium or high"
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?, description = ?, status = ?, due_date = ?, priority = ?, category = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            title,
            description || null,
            status || "pending",
            due_date || null,
            priority || "medium",
            category || null,
            id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: "Failed to update task"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            res.status(200).json({
                message: "Task updated successfully"
            });
        }
    );
});

// DELETE - Delete task
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to delete task"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    });
});

module.exports = router;