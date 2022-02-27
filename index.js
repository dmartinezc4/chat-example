const app = require('express')();
//carga express
const http = require('http').Server(app);
//carga la parte de aplicación de servidor de http
const io = require('socket.io')(http);
//caega sockets de tipo http
const port = process.env.PORT || 3000;
//creamos un puerto para en el que ejecutar nuestra app web


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
})


//creamos una conexión con el socket
//miramos si hay mensaje en el socket y se envía

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
//escucha lo que ocurra en el puerto definido anteriormente


io.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  
  
  // else the socket will automatically try to reconnect
});

io.on('connection', (socket) => {
  console.log('user ' + socket.id + ' connected');
  socket.on('disconnect', () => {
    console.log('user '+ socket.id + ' disconnected');
  });
});
/*Esto me permite poder ver en la consola que usuarios se ha 
conectado aunque sea con la ip con el chorro de numeros
*/