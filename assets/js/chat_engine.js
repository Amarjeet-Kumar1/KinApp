//frontend
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        //init client
        this.socket = io.connect();

        if(this.userEmail){
            this.connectHandler();
        }
    }

    connectHandler(){

        let self = this;
        //request connection
        this.socket.on('connect', function(){
            console.log('connection established using sockets ...');
            //on connection emit a request to join room
            //send some data about room and user
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatRoom: 'KinApp'
            });
            
            //receive confirmation from server on new joining
            self.socket.on('user_joined', function(data){
                // console.log('a user joined');
            });
        });
            $('#send-message').click(function (e) { 
                let msg = $('#chat-message-input').val();
                if(msg != ''){
                    self.socket.emit('send_message', {
                        message: msg,
                        user_email: self.userEmail,
                        chatRoom: 'KinApp'
                    });
                }
                
            });

            self.socket.on('receive_message', function(data){
                // console.log('Message received');

                let newMessage = $('<li>');

                let messageType = 'others-message';
                if(data.user_email == self.userEmail){
                    messageType = 'self-message';
                }
                newMessage.addClass(messageType);
                newMessage.append($('<span>',{
                    'html': data.message
                }));

                newMessage.append($('<sub>',{
                    'html': data.user_email
                }));

                $('#chat-message-input').val("");
                $('#chat-messages-list').append(newMessage);

            });

            
        
        //if disconnected from server side
        this.socket.on('disconnect', function(){
            console.log('disconnected');

            
        });
    }
}