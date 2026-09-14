const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all contacts with sorting and pagination
router.get("/", (req, res) => {
    let { page = 1, limit = 5, sort = "id", order = "ASC" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const allowedSort = ["id", "name", "email", "phone", "company"];
    const allowedOrder = ["ASC", "DESC"];

    if (!allowedSort.includes(sort)) {
        return res.status(400).json({
            error: "Invalid sort field"
        });
    }

    order = order.toUpperCase();

    if (!allowedOrder.includes(order)) {
        return res.status(400).json({
            error: "Invalid sort order"
        });
    }

    const offset = (page - 1) * limit;

    const sql = `
        SELECT * FROM contacts
        ORDER BY ${sort} ${order}
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [limit, offset], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch contacts"
            });
        }

        res.status(200).json({
            page: page,
            limit: limit,
            data: result
        });
    });
});
// SEARCH contacts
router.get("/search", (req, res) => {
    const { name, email, phone } = req.query;

    if (!name && !email && !phone) {
        return res.status(400).json({
            error: "Please provide name, email or phone to search"
        });
    }

    let sql = "SELECT * FROM contacts WHERE ";
    let value;

    if (name) {
        sql += "name LIKE ?";
        value = `%${name}%`;
    } else if (email) {
        sql += "email LIKE ?";
        value = `%${email}%`;
    } else {
        sql += "phone LIKE ?";
        value = `%${phone}%`;
    }

    db.query(sql, [value], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Search failed"
            });
        }

        res.status(200).json(result);
    });
});
// GET contact by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM contacts WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch contact"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.status(200).json(result[0]);
    });
});
// PUT - Update contact
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address, company } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            error: "Name, email and phone are required"
        });
    }

    const sql = `
        UPDATE contacts
        SET name = ?, email = ?, phone = ?, address = ?, company = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, email, phone, address, company, id],
        (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        error: "Email or phone already exists"
                    });
                }

                return res.status(500).json({
                    error: "Failed to update contact"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Contact not found"
                });
            }

            res.status(200).json({
                message: "Contact updated successfully"
            });
        }
    );
});
// DELETE - Delete contact
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM contacts WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to delete contact"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact deleted successfully"
        });
    });
});

// POST - Add new contact
router.post("/", (req, res) => {
    const { name, email, phone, address, company } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            error: "Name, email and phone are required"
        });
    }

    const sql = `
        INSERT INTO contacts
        (name, email, phone, address, company)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, address, company],
        (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        error: "Email or phone already exists"
                    });
                }

                return res.status(500).json({
                    error: "Failed to add contact"
                });
            }

            res.status(201).json({
                message: "Contact added successfully",
                id: result.insertId
            });
        }
    );
});

module.exports = router;