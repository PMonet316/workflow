const Company = require('../db/models/Company');
const Project = require('../db/models/Project');
const User = require('../db/models/User');

module.exports = io => {

  io.on('connection', socket => {

    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-project', project => {
      socket.broadcast.emit('new-project', project);
    });

    // socket.on('new-channel', channel => {
    //   socket.broadcast.emit('new-channel', channel);
    // });

    // socket.on('delete-project', projectId => {
    //   socket.broadcast.emit('delete-project', projectId);
    // })

  });

};
