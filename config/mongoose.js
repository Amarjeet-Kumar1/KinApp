const mongoose = require('mongoose');
const env = require('./environment');

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(env.db_url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
// mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db = mongoose.connection;



db.on('error', console.error.bind, 'Error in connecting to database');

db.once('open', function(){
    console.log('Successfully connected to database');
});
