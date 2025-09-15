const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose');

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

class CourseController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('show_course', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((err) =>
                res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' }),
            );
    }

    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('./course/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    create(req, res, next) {
        res.render('./course/create');
    }
    async store(req, res, next) {
        try {
            const formData = req.body;

            // Tạo thumbnail từ video nếu chưa có
            if (!formData.img && formData.video) {
                formData.img = `https://img.youtube.com/vi/${formData.video}/hqdefault.jpg`;
            }

            // Tạo slug duy nhất từ name
            formData.slug = await generateUniqueSlug(formData.name);

            const course = new Course(formData);
            await course.save();

            // Redirect về danh sách khóa học
            res.redirect('/me/stored/courses');
        } catch (err) {
            next(err); // để Express xử lý lỗi
        }
    }
    // [GET] //khoa_hoc/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('course/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/course'))
            .catch(next);
    }

    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // Khôi phục
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    // Xoá vĩnh viễn
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    actionHbs(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            case 'restores':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .catch(next);
                break;
            case 'forceDelete':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .catch(next);
                break;
            default:
                break;
        }
    }
}

module.exports = new CourseController();
