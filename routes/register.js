/**
 * Created by Fujitsu on 05.12.2016.
 */
var db = require("../database/db.js");

exports.register = function (req, res) {
    var obj = req.body;
    console.log(typeof obj.mail);
    db.addUser(obj.mail, obj.pass);
    res.redirect("/");
}