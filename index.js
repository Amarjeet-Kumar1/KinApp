const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

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

//use express router
app.use('/', require('./routes'));



//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

 
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});