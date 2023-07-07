/* GET about view */
const news = (req, res) => {
    res.render('news', { title: 'news'});
};

module.exports = {
    news
};