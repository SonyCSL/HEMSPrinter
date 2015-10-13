import processing.net.*;
import java.net.*;
// https://github.com/256dpi/processing-mqtt
import processing.mqtt.*;
import http.requests.*;
import java.util.Date;
import java.text.DateFormat ;

MQTTClient client;
final String mqttServer = "kadecotgallery.xyz" ;
final int MQTTPORT = 12345 ;  // 16069
//final String mqttServer = "m01.mqtt.cloud.nifty.com" ;
//final int MQTTPORT = 16077 ;  // 16069
final String SIMULATOR_ADDR = "192.168.110.227:8080/" ;



final String mqsendtopic = "send_msg" ;
final String mqrecvtopic = "recv_msg" ;
final String mqUserName = "Kadecot" ;
final String mqUserPass = "Moekaden" ;
//final String mqUserName = "rootsony" ;
//final String mqUserPass = "MfX843_g" ;
//final String mqUserName = "pubsubuser1" ;
//final String mqUserPass = "pospos" ;

// User Profiles
static String upLastName="", upFirstName="" ;
static double upLat=0, upLng=0 ;
static String upForcastString="" ;


void setup() {
  client = new MQTTClient(this);

  //client.connect("mqtt://"+mqttServer + ":" + MQTTPORT, "NiftyMQTTTest");
  client.connect("mqtt://"+mqUserName+":"+mqUserPass+"@"+mqttServer + ":" + MQTTPORT, "HEMSPrinterServer");
  
              new Thread( new Runnable() {
                @Override
                public void run() {
                  try {

                    Thread.sleep(1000) ;

                    // Get profiles
                    getUserProfiles() ;

                    client.subscribe(mqrecvtopic);
                    println("Subscribe "+mqrecvtopic) ;

                  } catch( InterruptedException e ){
                    System.err.println("Thread interrupted : "+e.toString()) ;
                  }
                }
            } ).start() ;
            
}

int id_to_send ;
void messageReceived(String topic, byte[] payload) {
  String recv = new String(payload) ;
  println("Recv: " + recv);
  
  if( recv.equals("\"getPowerStatus\"") ){
      int cumPower = getIntValueFromHTTPResponse("/smart/history?type=get&key=mainPower&target=201412") ;
      client.publish(mqsendtopic,"PowerStatus,{\"goal\":10000000,\"current\":"+cumPower+"}") ;
  } else if( recv.equals("\"allPowerOff\"") ){
      sendHTTPGet("/smart/rest/request?deviceid=lite.aircon_1_1&type=set&key=operationStatus&value=OFF") ;
      sendHTTPGet("/smart/rest/request?deviceid=lite.ledLight_1_1&type=codeset&key=80&value=31") ;
  } else if ( recv.equals("\"getUserProfile\"") ){
                    client.publish(mqsendtopic,"UserProfile,{"
                      +"\"lastname\":\""+upLastName+"\""
                      +",\"firstname\":\""+upFirstName+"\""
                      +",\"latitude\":"+upLat
                      +",\"longitude\":"+upLng
                      +",\"forecast\":"+upForcastString
                      +"}" ) ;
                      
                      println("**********") ;
                      println("UserProfile,{"
                      +"\"lastname\":\""+upLastName+"\""
                      +",\"firstname\":\""+upFirstName+"\""
                      +",\"latitude\":\""+upLat+"\""
                      +",\"longitude\":\""+upLng+"\""
                      +",\"forecast\":"+upForcastString
                      +"}"  ) ;
  }
}




////////////////// Daiwa API Access
int reqCountDown = 100 ;

void draw() {
  if( reqCountDown > 0 && --reqCountDown == 0 ){
    int totalPower = getIntValueFromHTTPResponse("/smart/rest/request?deviceid=lite.boardMeter_1_1&type=get&key=instantPower") ;
     if( totalPower > 2000 )
      client.publish(mqsendtopic,"DR,"+totalPower) ;

    reqCountDown = 500 ;
  }
}



void sendHTTPGet(String urlcmd){
  println("req : http://"+SIMULATOR_ADDR+urlcmd) ;
    GetRequest get = new GetRequest("http://"+SIMULATOR_ADDR+urlcmd);
    get.send();
}

int getIntValueFromHTTPResponse(String urlcmd){
  println("req : http://"+SIMULATOR_ADDR+urlcmd) ;
    GetRequest get = new GetRequest("http://"+SIMULATOR_ADDR+urlcmd);
    get.send();
    try {
      XML xml = parseXML(get.getContent()) ;//.getChild("resultset").get ;
      int re = Integer.parseInt(xml.getChild("dataset").getChild("data").getChild("value").getContent()) ;
      println("response : "+re) ;
      return re ;
      //c.stop() ;
    } catch (Exception e){
      println("XML parse error : "+e);
      println("------------") ;
      println(get.getContent()) ;
    }
    return -1 ;
}


void getUserProfiles(){
   String content = "" ;
   String fb[] = loadStrings("http://"+SIMULATOR_ADDR+"hemscommon/ver1.0/ServiceConnections/abcdefghijklmnopqrstuvwx12345678/HemsUser.xml") ;
   for( String s : fb ){ content += s ; }
    try {
      content = content.substring( content.indexOf("<?xml ") ) ;
      XML xml = parseXML(content); //.getChild("resultset").get ;
      upLastName = xml.getChild("HemsUserLastNameKana").getContent() ;
      upFirstName = xml.getChild("HemsUserFirstNameKana").getContent() ;
      upLat = Double.parseDouble(xml.getChild("Latitude").getContent()) ;
      upLng = Double.parseDouble(xml.getChild("Longitude").getContent()) ;
      
      getForcastString() ;
   } catch (Exception e){
      println("XML parse error : "+e);
      println("------------") ;
      println(content) ;
    }
  }
  
  void getForcastString(){
    JSONObject json = loadJSONObject("http://api.openweathermap.org/data/2.5/forecast?lat="+upLat+"&lon="+upLng);
    JSONArray lis = json.getJSONArray("list");
    
    upForcastString = "[" ;
    
    for( int fi=0;fi<3 /*lis.size()*/;++fi ){
      JSONObject fijo = lis.getJSONObject(fi) ;

      if( fi==0 ) upForcastString += "{" ;
      else        upForcastString += ",{" ;

      long dateTimeSec = fijo.getLong("dt") ;
      upForcastString += "\"datetime\":"+dateTimeSec ;
      Date dt = new Date(dateTimeSec*1000L);
      upForcastString += ",\"hours\":"+dt.getHours() ;
      upForcastString += ",\"icon\":\""+fijo.getJSONArray("weather").getJSONObject(0).getString("icon")+"\"" ;
      upForcastString += ",\"temp\":"+(fijo.getJSONObject("main").getFloat("temp")-273.15) ;
      upForcastString += ",\"humidity\":"+fijo.getJSONObject("main").getInt("humidity") ;
      upForcastString += ",\"pressure\":"+fijo.getJSONObject("main").getFloat("pressure") ;
      upForcastString += ",\"clouds\":"+fijo.getJSONObject("clouds").getInt("all") ;
      upForcastString += ",\"wind\":"+fijo.getJSONObject("wind").getFloat("speed") ;
      //String dateString = dt.toLocaleString() ;
      //String weatherString =  ;
      upForcastString += "}" ;
      
    }
    upForcastString += "]" ;
    //println( upForcastString ) ;
  }
