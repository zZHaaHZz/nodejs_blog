// Import các module cần thiết
const path = require('path'); // Module built-in của Node.js để xử lý đường dẫn
const express = require('express'); // Framework Express để xây dựng web server
const morgan = require('morgan'); // Middleware log request ra console (dùng cho debug)
const { engine } = require('express-handlebars'); // Import engine() từ express-handlebars để cấu hình view engine

const app = express(); // Tạo ứng dụng Express
const port = 3000; // Đặt port cho server

const route = require('./routes');
const db = require('./config/db');

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
        extname: '.hbs', // Mặc định Handlebars dùng .handlebars, mình đổi sang .hbs cho ngắn gọn
    }),
);

// Thiết lập view engine mặc định là "hbs"
app.set('view engine', 'hbs');

// Thiết lập thư mục chứa các file view (template)
app.set('views', path.join(__dirname, 'sources', 'views'));

route(app);
// -------------------- Start server -------------------- //
// Khởi động server tại port 3000
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
