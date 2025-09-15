module.exports = function SortMiddlewares(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };
    if ('_sort' in req.query) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.colum = req.query.colum;
        // res.locals._sort.type = req.query.type;

        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            colum: req.query.colum,
        });
    }
    next();
};
