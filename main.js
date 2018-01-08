'use strict';

const db = require('./server/db/models').db
const app = require('./server')
const PORT = 1337;
const server = app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`));
const io = require('socket.io')(server);

require('./server/socket')(io)

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
.then(() => {
  console.log('db synced')
});
