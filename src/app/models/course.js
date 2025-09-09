const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 500 },
    img: { type: String, maxlength: 255 },
    slug: { type: String, unique: true }, // slug tự sinh
    video: { type: String, maxlength: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
