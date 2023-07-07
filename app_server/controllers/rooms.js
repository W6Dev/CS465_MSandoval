/* GET about view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'rooms'});
};

module.exports = {
    rooms
};