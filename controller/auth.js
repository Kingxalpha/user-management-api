require('dotenv').config()
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const connection = require('../db/connect')
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { fullname, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { fullname, username, password: hashedPassword };

        connection.query('INSERT INTO user SET ?', newUser, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error signing up');
            } else {
                res.status(201).send('User signed up successfully');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing up');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        connection.query('SELECT * FROM user WHERE username = ?', [username], async (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error logging in');
            } else if (results.length === 0) {
                res.status(401).send('Invalid username or password');
            } else {
                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
                    res.json({ user, token });
                } else {
                    res.status(401).send('Invalid username or password');
                }
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
}


module.exports = {
    register,
    login
}
