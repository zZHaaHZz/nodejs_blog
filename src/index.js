// Import các module cần thiết
const path = require('path'); // Module built-in của Node.js để xử lý đường dẫn
const express = require('express'); // Framework Express để xây dựng web server
const morgan = require('morgan'); // Middleware log request ra console (dùng cho debug)
const { engine } = require('express-handlebars'); // Import engine() từ express-handlebars để cấu hình view engine
const methodOverride = require('method-override');
const app = express(); // Tạo ứng dụng Express
const port = 3000; // Đặt port cho server
const hostname = 'localhost';
const route = require('./routes');
const db = require('./config/db');

const SortMiddlewares = require('./app/middlewares/SortMiddlewares');

db.connectDB();
// Middleware phục vụ file tĩnh (CSS, JS, ảnh...) trong thư mục "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------- Template engine -------------------- //
// Đăng ký Handlebars làm view engine với extension .hbs
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sorttable: (field, sort) => {
                const sortTyle = field === sort.colum ? sort.type : 'default';
                const icons ={
                    default: 'bi bi-funnel-fill',
                    asc: 'bi bi-sort-down',
                    desc: 'bi bi-sort-down-alt',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortTyle];
                const type = types[sortTyle];
                return `<a href="?_sort&colum=${field}&type=${type}">
                <span class="${icon}"></span>
            </a>`;},
        },
    }),
);

app.use(methodOverride('_method'));

app.use(SortMiddlewares);

// Thiết lập view engine mặc định là "hbs"
app.set('view engine', 'hbs');

// Thiết lập thư mục chứa các file view (template)
app.set('views', path.join(__dirname, 'sources', 'views'));

route(app);
// -------------------- Start server -------------------- //
// Khởi động server tại port 3000
app.listen(port, hostname, () => {
    console.log(`Server đang chạy tại http://${hostname}:${port}`);
});
