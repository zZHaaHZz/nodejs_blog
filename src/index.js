// Import các module cần thiết
require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const app = express();

const route = require('./routes');
const db = require('./config/db');
const SortMiddlewares = require('./app/middlewares/SortMiddlewares');

// -------------------- DB -------------------- //
db.connectMongo();
// db.connectMySQL();

// -------------------- Middleware -------------------- //
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(SortMiddlewares);

// -------------------- Template engine -------------------- //
// EJS (.ejs)

app.set('views', path.join(__dirname, 'sources/views'));

app.set('view engine', 'ejs');
// Express EJS Layouts
app.use(expressLayouts);

// Layout mặc định (ví dụ: src/sources/views/layouts/sell.ejs)
app.set('layout', 'layouts/sell');

app.set('layout', false);
// -------------------- Routes -------------------- //
route(app);

// -------------------- Start server -------------------- //
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server đang chạy tại http://${process.env.HOST_NAME}:${process.env.PORT}`);
});
