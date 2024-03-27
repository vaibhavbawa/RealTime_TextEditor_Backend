const express = require('express');
const app = express();
const {Server} = require('socket.io');
const {createServer} = require('http')
const server =  createServer(app);




const io = new Server(server,{
    cors:{
        origin:"*",
        credential:true,
        methods:["GET","POST"]
    }
})

io.on("connection" ,(socket)=>{
console.log("user connected ",socket.id);
socket.emit("msg","welcome to socket io server");
// io.emit("msg","welcome to socket io server");
// socket.broadcast.emit("msg",`${socket.id},joined the server`)
socket.on("rc",(data)=>{
    console.log("RC data ", data);
})
socket.on("disconnect",()=>{
console.log("user disconnected ",socket.id);
})
})


const PORT = 3000;
server.listen(PORT,()=> console.log(`Listen on port ${PORT}`));