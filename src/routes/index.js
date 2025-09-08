const express = require('express/lib/express');

const newRouter = require('./news');
const movieController = require('./movie');
const siteRouter = require('./site');

function route(app) {
    // -------------------- Routing -------------------- //
    // Route GET "/" => khi vào http://localhost:3000/
    //     app.get('/', (req, res) => {
    //         res.render('home'); // render file home.hbs trong thư mục views
    //     });

    // Route GET "/news" => khi vào http://localhost:3000/news
    app.use('/news', newRouter);
    // Router GET movie
    app.use('/movie', movieController);
    app.use('/', siteRouter);
}

module.exports = route;
