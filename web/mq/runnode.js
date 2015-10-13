var socks = {} ;

function createIOPort(port,sockName){
	var app = require('express')();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);

	app.get('/', function(req, res){
	  res.sendfile('index.html');
	});

	http.listen(port, function(){
	  console.log('listening on *:'+port);
	});

	io.sockets.on('connection',function(socket){
		socket.on('init',function(data){
			console.log('Client connected : '+JSON.stringify(data)) ;
			socks[sockName] = socket ;
		});
		socket.on('disconnect', function(data) {
			console.log('Client disconnected') ;
			socks[sockName] = undefined ;
		});
		socket.on('message',function(data){
			console.log('Client msg : '+data) ;
			if(mq!=undefined){
				console.log('MQ Publish : '+data) ;
				mq.publish('recv_msg', data);
			}
		}) ;
	}) ;
} ;




var mqtt ;

createIOPort(12346,'c_sock') ;
createIOPort(12347,'c_sockB') ;


mqtt = require('mqtt');
var mq  = mqtt.connect('mqtt://localhost:12345');
 
mq.on('connect', function () {
  console.log('mqtt connected') ;
  mq.subscribe('send_msg');
  mq.subscribe('recv_msg');
  //client.publish('presence', 'Hello mqtt');
});
 
mq.on('message', function (topic, message) {
  // message is Buffer 
     console.log('MQTT published: '+message.toString());
  //     client.end();
       if( socks.c_sock != undefined ){
		console.log('Forward to c_sock : '+message.toString());
		socks.c_sock.emit('message',message.toString()) ;
       }
	if( socks.c_sockB != undefined ){
		console.log('Forward to c_sockB : '+message.toString());
		socks.c_sockB.emit('message',message.toString()) ;
	}
});

