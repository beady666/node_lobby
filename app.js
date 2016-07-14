var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var path = require('path');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

/* For use with ejs view engine - use to render views as html
 * NO LAYOUTS capability!
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
*/

/* Use handlebars view engine (with layouts) using .html file extensions */
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({defaultLayout: 'layout', extname: '.html'}));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()); // required for connect-flash messages

// set path from which to load static files
app.use(express.static(path.join(__dirname, 'public')));

// initialize express-session BEFORE passport
app.use(session({
  secret: 'secret',         // TODO: make this better
  saveUninitialized: true,
  resave: true
}));

// initalize passport AFTER express-session
app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

    while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash()); // connect-flash

// global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});

