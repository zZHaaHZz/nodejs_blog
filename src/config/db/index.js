const mongoose = require('mongoose');
const mysql = require('mysql2/promise'); // dùng promise cho async/await

async function connectMongo() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/blog');
        console.log('MongoDB Connected!');
    } catch (err) {
        console.log('MongoDB Connected false!', err);
    }
}

async function connectMySQL() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sellphone',
            port: 3307
        });
        console.log('MySQL Connected!');
        return connection;
    } catch (err) {
        console.log('MySQL Connected false!', err);
    }
}



module.exports = { connectMongo, connectMySQL };
