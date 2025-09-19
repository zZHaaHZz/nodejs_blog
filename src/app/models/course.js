const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: { type: Number }, // auto-increment
        name: { type: String, required: true, maxlength: 255 },
        description: { type: String, maxlength: 500 },
        img: { type: String, maxlength: 255 },
        slug: { type: String, unique: true },
        video: { type: String, maxlength: 255 },
    },
    {
        _id: false, // để plugin quản lý _id
        timestamps: true,
    }
);

// Slug middleware
CourseSchema.pre('save', async function (next) {
    if (this.isModified('name')) {
        let baseSlug = slugify(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;

        while (await mongoose.models.Course.findOne({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }

        this.slug = slug;
    }
    next();
});

// Soft delete
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

// Auto increment `_id`
CourseSchema.plugin(AutoIncrement, { id: 'course_seq', inc_field: '_id' });

module.exports = mongoose.model('Course', CourseSchema);
