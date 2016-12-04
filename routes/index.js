var express = require('express');
var db = require("../database/db.js");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render("login/index.html");
});

router.post("/", function (req, res) {
    db.hasUser(req.body.email, function (UserResult) {
        if (UserResult === true) {
            db.checkPass(req.body.email, req.body.pass, function (PassResult) {
                if (PassResult === true) {
                    req.session.user_id = req.body.email;
                    db.updateStatus(req.session.user_id, true);
                    res.redirect("/chat");
                    return;
                }
                if(PassResult === false) {
                    res.send("incorrect password");
                }
            })
        }
        if (UserResult === false) {
            res.send("incorrect email");
        }
    })
});

router.get("/register", function (req, res) {
    res.render("register/index.html");
});

router.post("/register", function (req, res) {
    var obj = req.body;
    console.log(typeof obj.mail);
    db.addUser(obj.mail, obj.pass);
    res.redirect("/");
});

router.post("/chat", function (req, res) {
    db.updateStatus(req.session.user_id, false);
    delete req.session.user_id;
    delete req.user;
    delete req.cookies;
    res.redirect('/');
});

router.get("/chat", function (req, res) {
    if (!req.session.user_id) {
        res.redirect("/");
        return;
    }
    if (req.session.user_id) {
        db.getAll(function (result) {
            var currentUser = req.session.user_id;
            names = result;
            db.getAllMessages(function (resMess) {
                res.render("Chatlist/index.html", {names: result, currentUser: currentUser, messages: resMess});
            });
        });
    }
});

module.exports = router;
