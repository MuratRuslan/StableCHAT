var Sequelize = require("sequelize");

var sequelize = new Sequelize("CHAT_DB", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});


var db = sequelize.define("users", {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    is_online: Sequelize.BOOLEAN
});

var dbMessages = sequelize.define("messages", {
    message: Sequelize.STRING,
    from: Sequelize.STRING
});


db.sync().then(function () {});

dbMessages.sync().then(function () {});

exports.addUser = function (name, password) {
    db.create({name: name, password: password});
    console.log("Database created!");
};


exports.hasUser = function (name, callback) {
    db.count({where: {name: name}}).then(function (result) {
        if (result != 0)
            callback(true);
        else
            callback(false);
    });
};

exports.checkPass = function (name, pass, callback) {
    db.count({where: {name: name, password: pass}}).then(function (result) {
        if (result != 0)
            callback(true);
        else
            callback(false);
    });
};

exports.getAll = function (callback) {
    db.findAll().then(function (result) {
        callback(result);
    });
};

exports.addMessage = function (message, from) {
    dbMessages.create({message: message, from: from});
};

exports.getAllMessages = function (callback) {
    dbMessages.findAll().then(function (result) {
        callback(result);
    });
};

exports.updateStatus = function (user_id, status) {
    db.update({is_online: status}, {where: {name: user_id}});
};






