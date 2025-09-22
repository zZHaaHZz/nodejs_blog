class SellController {
    index(req, res) {
        // Trỏ trực tiếp tới layout/sell.ejs
        res.render('layouts/main');
        // src/sources/views/layouts/sell.ejs
    }

}

module.exports = new SellController();
