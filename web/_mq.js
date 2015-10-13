var mq = {
	init : function(DR_cb){
		this.socket = io.connect('http://kadecotgallery.xyz:12346');
		this.socket.emit('init','Hello from client');
		this.socket.on('message',function(msg){
			var ci = msg.indexOf(",") ;
			var cmd = msg.substring(0,ci) ;
			var payload = msg.substring(ci+1) ;
			console.log(msg) ;
			switch(cmd){
			case "DR" : DR_cb(payload) ; break ;
			case "PowerStatus" :
				mq.powerStatusCallback(JSON.parse(payload)) ;
				mq.powerStatusCallback = undefined ;
				break ;
			case "UserProfile" :
				mq.userProfileCallback(JSON.parse(payload)) ;
				mq.userProfileCallback = undefined ;
				break ;
			}
		} ) ;
		this.getPowerStatus = function(cb){
			mq.powerStatusCallback = cb ;
			mq.socket.emit('message','getPowerStatus') ;
		} ;
		this.getUserProfile = function(cb){
			mq.userProfileCallback = cb ;
			mq.socket.emit('message','getUserProfile') ;
		}
		this.allPowerOff = function(){
			mq.socket.emit('message','allPowerOff') ;
		}
	}
} ;
