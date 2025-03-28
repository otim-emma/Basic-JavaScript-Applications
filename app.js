const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const moment = require('moment')

const app = express()
app.use(express.static('public'))
const server = http.createServer(app)
const io = socketio(server)

io.on('connection',function(socket){
    socket.emit('message','hello')
    console.log(socket.id)
    socket.on('joinRoom',function(room){
        socket.join(room)
        io.to(room).emit('message',`emma joined the room`)
        socket.broadcast.to(room).emit('message','typing....')
    })
    socket.on('disconnect',function(){
        io.emit('logged out',`last seen at ${moment().format('H:m a')}`)
    })
})
server.listen(3000)