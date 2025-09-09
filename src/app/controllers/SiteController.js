const Course = require('../models/course');
const {mutipleMongooseToObject} = require("../../util/mogoose");

class SiteController {
    index(req, res, next) {
        res.render('home');
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
