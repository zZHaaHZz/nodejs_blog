class MovieController {
    index(req, res) {
        res.render('movie');
    }
}
module.exports = new MovieController();
