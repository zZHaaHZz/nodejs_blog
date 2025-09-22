class AdminController {
    admin(req, res) {
        res.render('admin/dashboard.ejs', {
            layout: 'layouts/admin.ejs',
            title: 'Admin Dashboard',
            pageTitle: 'Dashboard Tổng quan'
        });
    }
}
module.exports = new AdminController();
