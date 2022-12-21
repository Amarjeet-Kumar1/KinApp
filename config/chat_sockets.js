
//received that chatServer(http server) here
module.exports.chatSockets = function(chatServer){
    //import socket.io and connect it to app server
    const { Server } = require("socket.io");
    const io = new Server(chatServer );
    // let io = require('socket.io')(chatServer);
      //receive connection request from client and establish the connection
    io.on('connection', function(socket){
        console.log('new connection recieved', socket.id);
        //if disconnected from client side
        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });
        //received a request to join room
        socket.on('join_room', function(data){
            console.log('Joining request recieved', data);
            //join that room
            //if data.chatRoom exists user will be connected/entered to it
            //if not create chatroom and enter the user into it
            socket.join(data.chatRoom);

            //send data back some confirmation after join
            //emit in specific chatroom
            io.in(data.chatRoom).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
            // socket.join(data.chatBox);
            io.in(data.chatRoom).emit('receive_message', data);
        });

    });
}
