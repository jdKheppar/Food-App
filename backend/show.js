const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool to the MySQL server
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2431',
    database: 'FoodItems',
});

// Retrieve data from the ItemsTable
function retrieveFoodItems(callback) {
    const selectQuery = 'SELECT * FROM ItemsTable';

    pool.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Error retrieving data:', error);
            callback(error, null);
            return;
        }

        callback(null, results);
    });
}

// Retrieve data from the CartTable
function retrieveCartItems(callback) {
    const selectQuery = 'SELECT * FROM CartData';

    pool.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Error retrieving data:', error);
            callback(error, null);
            return;
        }

        callback(null, results);
    });
}

// Route to send the JSON data of foodItems
app.get('/foodItems', (req, res) => {
    console.log("food Items request received");
    retrieveFoodItems((error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve data' });
            return;
        }

        res.json(results);
    });
});

// Route to send the JSON data of cartItems
app.get('/cartItems', (req, res) => {
    console.log("cart Items request received");
    retrieveCartItems((error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve data' });
            return;
        }

        res.json(results);
    });
});

// Route to handle the POST request and insert data into MySQL
app.post('/register', (req, res) => {
    const formData = req.body;

    const insertQuery = 'INSERT INTO usersData (user_email, user_name, user_password) VALUES (?, ?, ?)';
    const values = [formData.email, formData.username, formData.password];

    pool.query(insertQuery, values, (error, result) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'Failed to insert data into MySQL' });
            return;
        }

        console.log('Data inserted into MySQL:', result);
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const selectQuery = 'SELECT * FROM usersData WHERE (user_name = ? OR user_email = ?) AND user_password = ?';
    const values = [username, username, password];

    pool.query(selectQuery, values, (error, results) => {
        if (error) {
            console.error('Error executing login query:', error);
            res.status(500).json({ error: 'Failed to perform login' });
            return;
        }

        if (results.length > 0) {
            // User is authenticated
            res.status(200).json({ message: 'Login successful' });
        } else {
            // User credentials are invalid
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// Start the server
app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});
