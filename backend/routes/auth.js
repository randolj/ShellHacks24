const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/database');
require('dotenv').config();

const router = express.Router();

// Function to generate a JWT token
function generateToken(user) {
    return jwt.sign({ id: user.id }, "temp", { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
}

// Register Route
router.post('/signup', async (req, res) => {
    const { name, username, password } = req.body;

    try {
        // Check if the user already exists
        const checkUserSql = `SELECT * FROM users WHERE username = ?`;
        db.get(checkUserSql, [username], async (err, existingUser) => {
            if (err) {
                return res.status(500).send({ error: 'Database error.' });
            }
            if (existingUser) {
                return res.status(400).send({ message: 'User already exists.' });
            }

            // Hash password and insert the user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const sql = `INSERT INTO users (name, username, password) VALUES (?, ?, ?)`;
            db.run(sql, [name, username, hashedPassword], function (err) {
                if (err) {
                    return res.status(400).send({ error: err.message });
                }

                const token = generateToken({ id: this.lastID });
                res.status(201).send({ message: 'User created successfully', id: this.lastID, token: token });
            });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ?`;

    db.get(sql, [username], async (err, user) => {
        if (err) {
            return res.status(500).send({ error: 'Database error.' });
        }

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        // Compare the given password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Password is incorrect' });
        }

        // Generate a JWT token
        const token = generateToken(user);
        res.status(200).send({ message: 'Login successful!', token: token });
    });
});

router.get('/user-data', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const sql = `SELECT name, budget FROM users WHERE id = ?`;
        db.get(sql, [userId], (err, row) => {
            if (err) {
                return res.status(500).send({ error: err.message });
            }
            if (row) {
                res.json({
                    name: row.name,
                    budget: row.budget,
                });
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        });
    } catch (err) {
        return res.status(401).send({ message: 'Invalid or expired token' });
    }
});

router.post('/update-budget', authenticateToken, (req, res) => {
    const { budget } = req.body;

    // Validate the budget value
    if (typeof budget !== 'number' || budget < 0) {
        return res.status(400).send({ message: 'Invalid budget value' });
    }

    const userId = req.user.id;
    const sql = `UPDATE users SET budget = ? WHERE id = ?`;

    db.run(sql, [budget, userId], function (err) {
        if (err) {
            console.error("Error updating budget:", err);
            return res.status(500).send({ error: 'Failed to update budget' });
        }
        res.send({ message: 'Budget updated successfully' });
    });
});


module.exports = router;
