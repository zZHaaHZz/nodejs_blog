const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 255 },
        description: { type: String, maxlength: 500 },
        img: { type: String, maxlength: 255 },
        slug: { type: String, unique: true }, // tự tạo ở middleware
        video: { type: String, maxlength: 255 },
    },
    { timestamps: true },
);

// Middleware tạo slug trước khi lưu
CourseSchema.pre('save', async function (next) {
    if (this.isModified('name')) {
        let baseSlug = slugify(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        // Check trùng slug trong DB
        while (await mongoose.models.Course.findOne({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        this.slug = slug; // gán slug vào document
    }
    next();
});

// Soft delete
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
