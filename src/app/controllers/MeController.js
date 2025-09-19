const Course = require('../models/course');
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose');

class MeController {
    index(req, res, next) {
        let courseQuery = Course.find({});

        if ('_sort' in req.query) {
            // kiểm tra type có hợp lệ không
            const type = ['asc', 'desc'].includes(req.query.type)
                ? req.query.type
                : 'desc'; // mặc định desc

            courseQuery = courseQuery.sort({
                [req.query.colum]: type,
            });
        }

        Promise.all([
            courseQuery,
            Course.countDocumentsWithDeleted({ deleted: true }),
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
        let courseQuery = Course.findWithDeleted({ deleted: true });

        if ('_sort' in req.query) {
            const field = req.query.colum;
            const type = ['asc', 'desc'].includes(req.query.type)
                ? req.query.type
                : 'desc';

            courseQuery = courseQuery.sort({ [field]: type });
        }

        courseQuery
            .then((courses) => {
                res.render('me/course_trash', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
