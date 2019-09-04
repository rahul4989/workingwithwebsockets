var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
})
users=[];
io.on('connection',(socket)=>{
socket.on('setUsername',(data)=>{

    users.push(data);
    socket.emit('userSet',{username:data});
})
socket.on('createmsg',(data)=>{
  io.sockets.emit('newmsg',data);
})
socket.on('typing',(data)=>{
  socket.broadcast.emit('typinghandled',{data})
})
socket.broadcast.emit('clientdisconnected',{desc:"client disconnected"});

})



http.listen(3000, function(){
  console.log('listening on *:3000');
});
