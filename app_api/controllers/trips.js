const mongoose = require('mongoose');
const Trip = mongoose.model('trip');
const User = mongoose.model('user');


//GET: 
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {            
      User
        .findOne({ email : req.payload.email })         
        .exec((err, user) => {
          if (!user) {
            return res
              .status(404)
              .json({"message": "User not found"});
          } else if (err) {
            console.log(err);
            return res
              .status(404)
              .json(err);
           }
          callback(req, res, user.name);                
        });
    } else {
      return res
        .status(404)
        .json({"message": "User not found"});
    }
};

//GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Trip
        .find({}) //empty filter for all
        .exec((err, trips)=> {
            if (!trips) {
                return res
                    .status(404)
                    .json({"message": "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

//GET /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Trip
        .find({'code': req.params.tripCode})
        .exec ((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({'message' : 'trip not found'});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};


const tripsAddTrip = async (req, res) => {
    getUser(req, res, 
      (req, res) => {
        Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            (err, trip) => {
                if (err) {
                    return res
                      .status(400)
                      .json(err);
                } else {
                    return res
                      .status(201)
                      .json(trip);
                }
            });
      }
    );
}


const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, 
      (req, res) => {
        Trip
            .findOneAndUpdate({'code': req.params.tripCode}, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }, {new: true})
            .then (trip => {
                if (!trip) {
                    return res
                      .status(404)
                      .send({
                        message: "Trip not found with code " + req.params.tripCode
                      });
                }
                res.send(trip);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                      .status(404)
                      .send({
                        message: "Trip not found with code " + req.params.tripCode
                      });
                }
                return res
                  .status(500)
                  .json(err);
            });
      }
    );
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};