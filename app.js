const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

// Loading config file from the config directory 
dotenv.config({ path: './config/config.env' });

// Passport configuration
require('./config/passport')(passport)

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

//Logging - checking if development environment is being run
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

//Handlebar helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs');

// Handlebars - creating the middleware
app.engine('.hbs', exphbs({ helpers: { formatDate, stripTags, truncate, editIcon, select, }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
// To use short form hbs instead of .handlebars everytime we need 

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global variable for user of views/books/index.hbs
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// Joining the path of static folder - __dirname is the current working directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes - Linking the routes with app.js
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/', require('./routes/newSignup'));

const PORT = process.env.PORT || 3000;
// The PORT constant will get either the PORT number specified in the config file or 4200.
// We will check the PORT number on app.listen

app.listen(
    PORT,
    console.log(`-----Server running in environment: ${process.env.NODE_ENV} on port number: ${PORT}-----`)
);

