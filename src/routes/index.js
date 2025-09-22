const express = require('express/lib/express');

const siteRouter = require('./site');

const adminRouter = require('./admin');
const categoryRouter = require('./category');
const productRouter = require('./product');
const brandRouter = require('./brand');


function route(app) {


    app.use('/admin', adminRouter);
    app.use('/admin/categories', categoryRouter);
    app.use('/admin/products', productRouter);
    app.use('/admin/brand', brandRouter);
    app.use('/customer', adminRouter);
    app.use('/', siteRouter);

}

module.exports = route;
