const db = require("../config/db");

// GET all tasks - Search, Filter, Sort, Pagination
exports.getAllTasks = (req, res) => {
    const {
        search,
        status,
        sortBy = "created_at",
        order = "DESC",
        page = 1,
        limit = 10
    } = req.query;

    const allowedSortFields = [
        "id",
        "title",
        "status",
        "priority",
        "due_date",
        "created_at"
    ];

    if (!allowedSortFields.includes(sortBy)) {
        return res.status(400).json({
            error: "Invalid sort field"
        });
    }

    const sortOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    let sql = "SELECT * FROM tasks WHERE 1=1";
    const values = [];

    if (search) {
        sql += " AND (title LIKE ? OR description LIKE ? OR category LIKE ?)";
        const searchValue = `%${search}%`;
        values.push(searchValue, searchValue, searchValue);
    }

    if (status) {
        if (!["pending", "completed"].includes(status)) {
            return res.status(400).json({
                error: "Status must be pending or completed"
            });
        }

        sql += " AND status = ?";
        values.push(status);
    }

    const pageNumber = Math.max(parseInt(page), 1);
    const limitNumber = Math.max(parseInt(limit), 1);
    const offset = (pageNumber - 1) * limitNumber;

    sql += ` ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?`;
    values.push(limitNumber, offset);

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch tasks"
            });
        }

        res.status(200).json({
            page: pageNumber,
            limit: limitNumber,
            tasks: result
        });
    });
};