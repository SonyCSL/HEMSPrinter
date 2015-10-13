var mq = {
	init : function(DR_cb,DoorOut_cb,DoorIn_cb,PrinterBtnPress_cb){
		this.DR_cb = DR_cb ;
		this.DoorOut_cb = DoorOut_cb ;
		this.DoorIn_cb = DoorIn_cb ;
		this.PrinterBtnPress_cb = PrinterBtnPress_cb ;
		this.socket = io.connect('http://kadecotgallery.xyz:12346');
		this.socket.emit('init','Hello from client');
		this.socket.on('message',function(msg){
			var ci = msg.indexOf(",") ;
			var cmd = msg.substring(0,ci) ;
			var payload = msg.substring(ci+1) ;
			console.log(msg) ;
			switch(cmd){
				case "DR" :
					if( mq.DR_cb != undefined )
						DR_cb(payload);
					break;
				case "PowerStatus" :
					//alert("PowerStatusPayload:"+payload) ;
					mq.powerStatusCallback(JSON.parse(payload));
					break;
				case "UserProfile" :
					//alert("UserProfilePayload:"+payload) ;
					mq.userProfileCallback(JSON.parse(payload));
					break;
				case "DoorSensor" :
					if( payload == "O" ){
						if( mq.DoorOut_cb != undefined )
							mq.DoorOut_cb() ;
					} else if( payload == "I" ){
						if( mq.DoorIn_cb != undefined )
							mq.DoorIn_cb() ;
					}
					break ;
				case "HEMSPrinter" :
					//alert('Printer : '+payload+' : '+(typeof mq.PrinterBtnPress_cb)) ;
					if( payload == "0" && mq.PrinterBtnPress_cb != undefined ){
						mq.PrinterBtnPress_cb() ;
					}
					break ;
				default :
					console.log('Unknown msg : '+msg) ;
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
		} ;
		this.allPowerOff = function(){
			mq.socket.emit('message','allPowerOff') ;
		} ;
		this.setPrinterButtonLED = function(bOn){
			mq.socket.emit('message','PrinterLED'+(bOn?'On':'Off')) ;
		} ;
	}
} ;
