/* GET about view */
const meals = (req, res) => {
    res.render('meals', { title: 'meals'});
};

module.exports = {
    meals
};