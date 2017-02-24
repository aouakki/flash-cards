var express = require("express");
var body_parser = require("body-parser");
var session = require('express-session');
var flash = require('./middlewares/flash-messages');
var card = require("./models/card")

/* App Moiddlewares */


//start our app
var app = express();


// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({
    extended: false
}))
// parse application/json
app.use(body_parser.json())

// for static files
app.use(express.static(__dirname + '/public'));


/* App configuration */

// set the template engine to ejs
app.set("view engine", "ejs");


// set session configuration parameters
app.use(session({
    secret: 'qt4jNbkz8hRJs1s4Wak', // secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    } // no https
}))

/// for flash msgs
app.use(flash);

/* Routes */

app.get('/', function(req, resp) {
    resp.render("index");
});

app.post("/add", function(req, resp) {

    if (req.body.question === undefined || req.body.question === '') {
        req.flash("error", "Empty question field");
    }
    if (req.body.answer === undefined || req.body.answer === '') {
        req.flash("error", "Empty Answer field");
    }

    if (req.hasError()) {
        resp.redirect('/');
    } else {
        card.create(req.body.question, req.body.answer, function() {
            req.flash("info", "card added successfuly ");
            resp.redirect('/');
        });
    }

});



app.listen(8888);
