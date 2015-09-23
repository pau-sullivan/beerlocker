// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost/beerlocker');
//// Create our Express application
//// it is used to define routes, start listening for http connections, and perform routing for requests.
var app = express();
//
//// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

/// Use environment defined port or 3000
//var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();
// <editor-fold defaultstate="collapsed" desc="Old Router beers ">
//// Initial dummy route for testing
//// http://localhost:3000/api
//router.get('/', function(req, res) {
//  res.json({ message: 'You are running dangerously low on beer!' });
//});
// Create a new route with the prefix /beers
//var beersRoute = router.route('/beers');
//
//// Create endpoint /api/beers for POSTS
//beersRoute.post(function(req, res) {
//  // Create a new instance of the Beer model
//  var beer = new Beer();
//
//  // Set the beer properties that came from the POST data
//  beer.name = req.body.name;
//  beer.type = req.body.type;
//  beer.quantity = req.body.quantity;
//
//  // Save the beer and check for errors
//  beer.save(function(err) {
//    if (err)
//      res.send(err);
//
//    res.json({ message: 'Beer added to the locker!', data: beer });
//  });
//});
//
//// Create endpoint /api/beers for GET
//beersRoute.get(function(req, res) {
//  // Use the Beer model to find all beer
//  Beer.find(function(err, beers) {
//    if (err)
//      res.send(err);
//
//    res.json(beers);
//  });
//});
// </editor-fold>

// Create endpoint handlers for /beers
router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);
  
// <editor-fold defaultstate="collapsed" desc="Old Router beers/:beer_id">
// Create a new route with the /beers/:beer_id prefix
//var beerRoute = router.route('/beers/:beer_id');
//
//// Create endpoint /api/beers/:beer_id for GET
//beerRoute.get(function(req, res) {
//  // Use the Beer model to find a specific beer
//  Beer.findById(req.params.beer_id, function(err, beer) {
//    if (err)
//      res.send(err);
//
//    res.json(beer);
//  });
//});
//
//// Create endpoint /api/beers/:beer_id for PUT
//beerRoute.put(function(req, res) {
//  // Use the Beer model to find a specific beer
//  Beer.findById(req.params.beer_id, function(err, beer) {
//    if (err)
//      res.send(err);
//
//    // Update the existing beer quantity
//    beer.quantity = req.body.quantity;
//
//    // Save the beer and check for errors
//    beer.save(function(err) {
//      if (err)
//        res.send(err);
//
//      res.json(beer);
//    });
//  });
//});
//
//// Create endpoint /api/beers/:beer_id for DELETE
//beerRoute.delete(function(req, res) {
//  // Use the Beer model to find a specific beer and remove it
//  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
//    if (err)
//      res.send(err);
//
//    res.json({ message: 'Beer removed from the locker!' });
//  });
//});
//</editor-fold>

 // Create endpoint handlers for /beers/:beer_id
router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);
  
// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
//console.log('Insert beer on port ' + port);

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function () {
//    
//    //var beer = mongoose.model('Beer', kittySchema);
//    
//        var beer = new Beer();
//        beer.name = 'Corona';
//        beer.type = 'Rubia';
//        beer.quantity = 1;
//
//
//       console.log(beer.name);
//
//       beer.save(function (err, beer) {
//           if (err) return console.error(err);
//       });
//    });