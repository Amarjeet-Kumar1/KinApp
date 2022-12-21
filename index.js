const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8000; 

const expressLayouts = require('express-ejs-layouts');
// const db = require('./config/mongoose');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/possport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
 
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');
 

//setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
//pass chatSever to this function to start socket.io in that folder
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
//start chat server(http server) on 5000
chatServer.listen(5000);
console.log('Chat server is listening on post 5000');
const path = require('path');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css' 
}));

app.use(express.urlencoded());

app.use(cookieParser());

//use static file
app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
 
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
    secret: env.session_cookie_key,
    saveUninitialized: false, //don;t create session ultil something strord
    resave: false, //don't save session if unmodified
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: env.db_url,
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connet-mongodb setup ok');
    }
    )

}));
 

app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthenticatedUser);

//put after session is used, it uses session cookies
//it setup in cookies which stores the  session info
app.use(flash());
app.use(customMware.setFlash);

//use express router after passport
app.use('/', require('./routes'));

 
 



const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(env.db_url,connectionParams)
    .then( () => {
        console.log('Connected to the database ');
        app.listen(port, function(err){
            if(err){
                console.log(`Error in running the server :${err}`);
            }
            
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
    });

