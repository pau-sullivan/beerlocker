// Load required packages
var mongoose = require('mongoose');

//Access tokens are the final step in the OAuth2 process. With an access token, 
//an application client is able to make a request on behalf of the user.

// Define our token schema
var TokenSchema   = new mongoose.Schema({
  value: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

// Export the Mongoose model
module.exports = mongoose.model('Token', TokenSchema);