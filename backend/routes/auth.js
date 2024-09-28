const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/database');
require('dotenv').config();

const router = express.Router();

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register Route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

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
      console.log(password, hashedPassword)

      const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
      db.run(sql, [username, hashedPassword], function (err) {
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

module.exports = router;
