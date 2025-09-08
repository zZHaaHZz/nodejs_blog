const Course = require('../models/course');

class SiteController {
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                courses = courses.map(course => course.toObject()) ;
                res.render('home', {courses})
            })

            .catch(err => res.status(500).json({ error: "Lỗi khi lấy dữ liệu" }));
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
