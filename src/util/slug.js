const Course = require('../models/course');

async function generateUniqueSlug(name) {
    let slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    let exists = await Course.findOne({ slug });
    let count = 1;

    while (exists) {
        slug = `${slug}-${count}`;
        exists = await Course.findOne({ slug });
        count++;
    }

    return slug;
}

module.exports = generateUniqueSlug;
