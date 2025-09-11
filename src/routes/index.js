const express = require('express/lib/express');

const newRouter = require('./news');

const courseRouter = require('./course');

const siteRouter = require('./site');

const meRouter = require('./me');

function route(app) {
    app.use('/news', newRouter);

    app.use('/course', courseRouter);

    app.use('/me', meRouter);

    app.use('/', siteRouter);
}

module.exports = route;
