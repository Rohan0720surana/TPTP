// User model: stores login details.
// These two field names must match the input "name"s in login.html and registration.html.
const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    username: String,
    password: String
}));
