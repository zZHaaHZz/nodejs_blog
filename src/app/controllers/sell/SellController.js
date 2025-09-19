class SellController {
    show(req, res) {
        res.render('sell/sell_layout/sell.ejs');
        // => trỏ tới src/sources/views/sell/sell_layout/sell.ejs
    }

    admin(req, res) {
        res.render('sell/sell_layout/sell_admin.ejs');
        // => trỏ tới src/sources/views/sell/sell_layout/sell_admin.ejs
    }
}

module.exports = new SellController();
