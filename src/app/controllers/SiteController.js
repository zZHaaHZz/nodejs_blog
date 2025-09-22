const Course = require('../models/course');
const { mutipleMongooseToObject } = require('../../util/mogoose');

class SiteController {
    index(req, res) {
        res.render('layouts/sell', { layout: 'layouts/main' });
    }
}

module.exports = new SiteController();
