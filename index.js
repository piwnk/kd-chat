const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const UsersService = require('./UsersService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const usersService = new UsersService();

app.use(express.static(`${__dirname}/public`));
app.use('/style', express.static(`${__dirname}/client/style`));

app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html');
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('join', (name) => {
    usersService.addUser({
      id: socket.id,
      name
    });

    io.emit('update', {
      users: usersService.getAllUsers()
    });
  });

  socket.on('disconnect', () => {
    usersService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: usersService.getAllUsers()
    });
  });

  socket.on('message', (message) => {
    const { name } = usersService.getUserById(socket.id);
    socket.broadcast.emit('message', {
      text: message.text,
      from: name
    });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
