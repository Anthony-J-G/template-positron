import * as sqlite3 from 'sqlite3';
import * as path from "path";

// Open a SQLite database in-memory (you can use a file path for a persistent database)
// const db = new sqlite3.Database(':memory:');

export function openDatabase() {
    const db = new sqlite3.Database(path.join(process.cwd(), 'test.db'));
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT
        );`
    );
}


function idk() {
    const db = new sqlite3.Database(path.join(process.cwd(), 'test.db'));
    // Create a table
    db.run('CREATE TABLE users (id INT, name TEXT)');

    // Insert data
    const userId = 1;
    const userName = 'John Doe';
    db.run('INSERT INTO users (id, name) VALUES (?, ?)', [userId, userName]);

    // Query data
    db.each('SELECT id, name FROM users', (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            // console.log(`User ID: ${row.id}, Name: ${row.name}`);
        }
    });

    // Close the database connection
    db.close();

}