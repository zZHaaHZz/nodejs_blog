const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 255 },
    img: { type: String, maxlength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Tên model viết hoa để dễ phân biệt
module.exports = mongoose.model('Course', CourseSchema);
