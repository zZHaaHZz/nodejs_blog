const Course = require('../models/course');
const { mutipleMongooseToObject } = require('../../util/mogoose');

class SiteController {
    index(req, res) {
        res.render('sell/sell_layout/sell.ejs');
        // => trỏ tới src/sources/views/sell/sell_layout/sell.ejs
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
