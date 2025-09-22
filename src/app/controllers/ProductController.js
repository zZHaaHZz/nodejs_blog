class ProductController {

    ManageProduct(req, res) {
        res.render('admin/products.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Quan lý san phẩm',
            pageTitle: 'Quan lý sản phẩm nề'
        });
    }
    CreateProduct(req, res) {
        res.render('admin/products/add_products.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Quan lý san phẩm',
            pageTitle: 'Quan lý sản phẩm nề'
        });
    }
}
module.exports = new ProductController();
