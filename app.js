/**
 * Created by gao on 2017/4/3.
 */
var express = require('express');
var app = express();
var prot = process.env.PORT || 3000;
app.use(express.static(__dirname + '/static'))
app.use(function(req,res){
    res.sendfile('./static/dist/index.html')
})
var io = require('socket.io').listen(app.listen(prot));
// var nsp = io.of('/my-namespace')
var messages = []
var nub = 0;
var nsp = io.of('/msg');
nsp.on('connection', (socket) => {
    console.log('connection')
    socket.on('getAllMessages', function(){
        console.log('on:getAllMessages')
        nsp.emit('allMessages', messages, nub)
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
    })

    socket.on('createMessage', function(message) {
        console.log('on:createMessage')
        messages.push(message)
        nsp.emit('messageAdded',message)
    })
});
