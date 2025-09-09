const express = require('express/lib/express');

const newRouter = require('./news');

const Khoa_hocRouter = require('./khoa_hoc');

const siteRouter = require('./site');

function route(app) {
    // -------------------- Routing -------------------- //
    // Route GET "/" => khi vào http://localhost:3000/
    //     app.get('/', (req, res) => {
    //         res.render('home'); // render file home.hbs trong thư mục views
    //     });

    // router
    app.use('/news', newRouter);

    app.use('/khoa_hoc', Khoa_hocRouter);

    app.use('/', siteRouter);
}

module.exports = route;
