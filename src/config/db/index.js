const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/blog');
        console.log('MongoDB Connected!');
    } catch (err) {
        console.log("MongoDB Connected false!");
    }
}
module.exports = { connectDB: connectDB };
