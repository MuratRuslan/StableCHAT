var express = require('express');
var db = require("../database/db.js");
var router = express.Router();
var login = require("./login.js");
var register = require("./register.js");
var chat = require("./chat.js");

/* GET home page. */
router.get('/', function (req, res) {
    res.render("login/index.html");
});

router.post("/", function (req, res) {
   login.login(req, res);
});

router.get("/register", function (req, res) {
    res.render("register/index.html");
});

router.post("/register", function (req, res) {
    register.register(req, res);
});

router.post("/chat", function (req, res) {
    chat.deleteSession(req, res);
});

router.get("/chat", function (req, res) {
    chat.initializeChat(req, res);
});

module.exports = router;
