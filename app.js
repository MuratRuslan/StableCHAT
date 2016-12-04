var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var nunjucks = require("nunjucks");
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var db = require('./database/db');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redisStore = require('connect-redis')(session);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');

var nunjucksConfig = {
    autoescape: true,
    express: app
};
if (app.get("env") === 'development') {
    nunjucksConfig.noCache = true;
}
nunjucks.configure(path.join(__dirname, 'views'), nunjucksConfig);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', "images", 'favicon.ico')));
app.use(function (req, res, next) {
    res.io = io;
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        db: 2,
        pass: 'RedisPASS'
    }),
    secret: '1234567890QWERTY'
}));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    console.log(req);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

io.on('connection', function (socket) {
    console.log("connected");
    socket.on('chat message', function (msg) {
        db.addMessage(msg.msg, msg.from);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        //db.updateStatus(result.user, false);
    })
});


module.exports = {app: app, server: server};
