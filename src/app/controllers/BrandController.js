class BrandController {
    ShowBrand(req, res) {
        res.render('admin/brand/show.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Quan ly danh muc',
            pageTitle: 'Quan lý danh muc',
        });
    }
    createBrand(req, res) {
        res.render('admin/brand/add.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Quan ly danh muc',
            pageTitle: 'Quan lý danh muc',
        });
    }

}
module.exports = new BrandController();
