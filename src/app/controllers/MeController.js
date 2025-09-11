const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose');

class MeController {
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('./me/course_me', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((err) =>
                res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' }),
            );
    }
}

module.exports = new MeController();
