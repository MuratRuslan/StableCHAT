var db = require("../database/db.js");

exports.deleteSession = function (req, res) {
    db.updateStatus(req.session.user_id, false);
    delete req.session.user_id;
    delete req.user;
    delete req.cookies;
    res.redirect('/');
}

exports.initializeChat = function (req, res) {
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
}