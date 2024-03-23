const express = require('express');
const app = express();
const {Server} = require('socket.io');
const {createServer} = require('http')
const server =  createServer(app);



const PORT = 3000;

const io = new Server(server,{
    cors:{
        origin:"*",
        credential:true,
        methods:["GET","POST"]
    }
})

io.on("connection" ,(socket)=>{
console.log("user connected ",socket.id);
io.emit("msg","welcome to socket io server");
io.emit("msg","welcome to socket io server");
socket.on("rc",(data)=>{
    console.log("RC data ", data);
    
    })
socket.on("disconnect",()=>{
console.log("user disconnected ");

})
})
server.listen(PORT,()=> console.log(`Listen on port ${PORT}`));