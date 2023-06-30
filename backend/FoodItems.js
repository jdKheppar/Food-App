const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2431',
});

// Connect to the MySQL server
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }

    console.log('Connected to MySQL server');

    // Create a new database
    connection.query('CREATE DATABASE IF NOT EXISTS foodItems', (error) => {
        if (error) {
            console.error('Error creating database:', error);
            return;
        }

        console.log('Database created');

        // Use the newly created database
        connection.query('USE FoodItems', (error) => {
            if (error) {
                console.error('Error using database:', error);
                return;
            }

            console.log('Using database');

            // Create a table
            const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ItemsTable (
          id INT AUTO_INCREMENT PRIMARY KEY,
          product_name VARCHAR(255),
          product_img VARCHAR(255),
          product_price FLOAT(8, 2)
        )
      `;

            connection.query(createTableQuery, (error) => {
                if (error) {
                    console.error('Error creating table:', error);
                    return;
                }

                console.log('ItemsTable created');

                // Create another table in the foodItems database
                const createUsersTableQuery = `
          CREATE TABLE IF NOT EXISTS usersData (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(255),
            user_email VARCHAR(255),
            user_password VARCHAR(255)
          )
        `;

                connection.query(createUsersTableQuery, (error) => {
                    if (error) {
                        console.error('Error creating UsersTable:', error);
                        return;
                    }

                    console.log('UsersTable created');

                    // Create another table in the foodItems database
                    const createCartTableQuery = `
            CREATE TABLE IF NOT EXISTS CartData (
              id INT AUTO_INCREMENT PRIMARY KEY,
              product_name VARCHAR(255),
              product_img VARCHAR(255),
              product_price FLOAT
            )
          `;

                    connection.query(createCartTableQuery, (error) => {
                        if (error) {
                            console.error('Error creating CartData:', error);
                            return;
                        }

                        console.log('CartTable created');

                        // Insert values into the ItemsTable
                        const insertItemValuesQuery = `
              INSERT INTO ItemsTable (product_name, product_img, product_price)
              VALUES
                ('Fahsa', 'https://www.chefspencil.com/wp-content/uploads/Fahsa-960x720.jpg.webp', 11.99),
                ('Saltah', 'https://www.chefspencil.com/wp-content/uploads/Saltah-960x960.jpg.webp', 10.00),
                ('Zurbian', 'https://www.chefspencil.com/wp-content/uploads/Zurbian-960x540.jpg.webp', 11.99),
                ('Mutabbaq', 'https://www.chefspencil.com/wp-content/uploads/Mutabaq.jpg.webp', 8.99),
                ('Masoub', 'https://cdn.tasteatlas.com/images/dishes/2e908f5c52cf45f58f5801aefe99151d.jpg?mw=1300', 19.00),
                ('Mandi', 'https://www.chefspencil.com/wp-content/uploads/Mandi--960x960.jpg.webp', 12.99)
            `;

                        connection.query(insertItemValuesQuery, (error) => {
                            if (error) {
                                console.error('Error inserting values:', error);
                                return;
                            }

                            console.log('Food Item Values inserted');

                            // Insert values into the CartData table
                            const insertCartValuesQuery = `
                INSERT INTO CartData (product_name, product_img, product_price)
                VALUES
                  ('Fahsa', 'https://www.chefspencil.com/wp-content/uploads/Fahsa-960x720.jpg.webp', 11.99),
                ('Saltah', 'https://www.chefspencil.com/wp-content/uploads/Saltah-960x960.jpg.webp', 10.00),
                ('Zurbian', 'https://www.chefspencil.com/wp-content/uploads/Zurbian-960x540.jpg.webp', 11.99),
                ('Mutabbaq', 'https://www.chefspencil.com/wp-content/uploads/Mutabaq.jpg.webp', 8.99),
                ('Masoub', 'https://cdn.tasteatlas.com/images/dishes/2e908f5c52cf45f58f5801aefe99151d.jpg?mw=1300', 19.00),
                ('Mandi', 'https://www.chefspencil.com/wp-content/uploads/Mandi--960x960.jpg.webp', 12.99)
              `;

                            connection.query(insertCartValuesQuery, (error) => {
                                if (error) {
                                    console.error('Error inserting values:', error);
                                    return;
                                }

                                console.log('Cart Item Values inserted');

                                // Close the connection
                                connection.end((error) => {
                                    if (error) {
                                        console.error('Error closing connection:', error);
                                        return;
                                    }

                                    console.log('Connection closed');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
