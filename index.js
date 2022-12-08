const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000; 

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');
 
const sassMiddleware = require('node-sass-middleware');
  
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css' 
}));

app.use(express.urlencoded());

app.use(cookieParser());

//use static file
app.use(express.static('./assets'));
 
//use express layout
app.use(expressLayouts);
  
//set default layout
app.set('layout', './layouts/layout');

//extract styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 
  
  

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to strore the session cookie in the db
app.use(session({
    name: 'kinApp',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false, //don;t create session ultil something strord
    resave: false, //don't save session if unmodified
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/kinApp_db',
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connet-mongodb setup ok');
    }
    )

}));
 

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);

//use express router after passport
app.use('/', require('./routes'));

 
 


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});