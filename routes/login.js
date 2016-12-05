/**
 * Created by Fujitsu on 05.12.2016.
 */
var db = require("../database/db.js");

exports.login = function (req, res) {
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
}