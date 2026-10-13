// Domain model: the data the question asks you to store.
// CHANGE 1: rename this file and "Sport" for your question (e.g. Pizza.js / "Pizza").
// CHANGE 2: the four field names below must match the input "name"s in index.html.
const mongoose = require("mongoose");

module.exports = mongoose.model("Sport", new mongoose.Schema({
    player: String,
    team: String,
    category: String,
    details: String
}));
