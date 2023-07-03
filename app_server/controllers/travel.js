
/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travlr Gateways', trips });
};

module.exports = {
    travel
};