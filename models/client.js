// Load required packages
var mongoose = require('mongoose');

// Define our client schema
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }, //aplicacion
  //the id and secret are used as part of the OAuth2 flow and should always be kept secret
  id: { type: String, required: true },
  secret: { type: String, required: true },
  
  userId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Client', ClientSchema);