const mongoose = require('mongoose');
const env = require('./environment');
const port = process.env.PORT || 8000;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(env.db_url, connectionParams)
  .then(() => {
    console.log('Connected to the database ');
    const app = require('../index');
    const httpserver = app.listen(port, function (err) {
      if (err) {
        console.log(`Error in running the server :${err}`);
      }

      console.log(`Server is running on port: ${port}`);
    });
    const chatSockets = require('./chat_sockets').chatSockets(httpserver);
  })
  .catch((err) => {
    console.error(`Error connecting to the database. ${err}`);
  });
