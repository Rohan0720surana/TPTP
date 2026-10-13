// ===== 1. Load packages and models =====
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./User");
const Sport = require("./Sport");          // CHANGE: "./Pizza", "./Book" ... (must match the file name)

// ===== 2. Create the app and add middleware =====
const app = express();
app.use(express.urlencoded({ extended: true }));   // reads login/registration form data
app.use(express.json());                           // reads JSON sent by fetch() in index.html

// Local Bootstrap and jQuery (work without internet)
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));

// ===== 3. Connect to MongoDB, then add routes =====
mongoose.connect("mongodb://127.0.0.1:27017/sportsdb").then(() => {   // CHANGE: database name (any name)

    // ----- Page routes -----
    app.get("/", (req, res) => res.redirect("/login"));
    app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "login.html")));
    app.get("/registration", (req, res) => res.sendFile(path.join(__dirname, "registration.html")));
    app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

    // ----- Register a new user -----
    app.post("/registration", async (req, res) => {
        await User.create(req.body);
        res.redirect("/login");
    });

    // ----- Login -----
    app.post("/login", async (req, res) => {
        let u = await User.findOne(req.body);
        if (!u) return res.send("Invalid Login");
        res.redirect("/home");
    });

    // ----- Fetch all records (used by load() in index.html) -----
    app.get("/items", async (req, res) =>
        res.json(await Sport.find())            // CHANGE: Pizza.find() ...
    );

    // ----- Save a record (used by the form in index.html) -----
    app.post("/add", async (req, res) => {
        await Sport.create(req.body);           // CHANGE: Pizza.create(req.body) ...
        res.send("Saved");
    });

    // ===== 4. Start the server =====
    app.listen(3000, () => console.log("http://localhost:3000"));

}).catch(console.error);
