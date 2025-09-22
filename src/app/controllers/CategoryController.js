class CategoryController {
    ShowCategory(req, res) {
        res.render('admin/category/show.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Quan ly danh muc',
            pageTitle: 'Quan lý danh muc',
        });
    }
    createCategory(req, res) {
        res.render('admin/category/add.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Quan ly danh muc',
            pageTitle: 'Quan lý danh muc',
        });
    }

}
module.exports = new CategoryController();
