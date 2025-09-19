// Import các module cần thiết
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();

const port = 3000;

const hostname = 'localhost';
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
// Handlebars (.hbs)
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sorttable: (field, sort) => {
                const icons = {
                    default: 'bi bi-funnel-fill',
                    asc: 'bi bi-sort-up-alt',
                    desc: 'bi bi-sort-up',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const isSorted = sort.colum === field;
                const sortType =
                    isSorted && ['asc', 'desc'].includes(sort.type)
                        ? sort.type
                        : 'default';
                const icon = icons[sortType];
                const nextType = types[sortType];

                return `
                    <a href="?_sort&colum=${field}&type=${nextType}">
                        <span class="${icon}"></span>
                    </a>`;
            },
        },
    }),
);

// EJS (.ejs) → Express hỗ trợ sẵn, không cần app.engine

// -------------------- Views -------------------- //
app.set('views', path.join(__dirname, 'sources/views'));

// ❌ KHÔNG set 2 cái view engine mặc định
// chỉ set 1 cái chính (ví dụ hbs)
app.set('view engine', 'hbs');

// -------------------- Routes -------------------- //
route(app);

// -------------------- Start server -------------------- //
app.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}`);
});
