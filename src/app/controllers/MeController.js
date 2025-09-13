const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose');

class MeController {
    index(req, res, next) {
        Promise.all([
            Course.find({}),
            Course.countDocumentsWithDeleted({ deleted: true })
        ])
            .then(([courses, deletedCount]) => {
                res.render('./me/course_me', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    trash(req, res, next) {
        Course.findWithDeleted({deleted:true}) // chỉ lấy các record deleted = true
            .then(courses => {
                res.render('me/course_trash', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

}

module.exports = new MeController();
