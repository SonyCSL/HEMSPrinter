import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import processing.mqtt.*; 
import java.net.DatagramPacket; 
import java.net.DatagramSocket; 
import java.net.InetAddress; 
import java.io.PrintWriter; 
import java.net.Socket; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class IRemoconOverNAT_Home extends PApplet {

// iRemocon over NAT (Home side)
// Topic "/iRemoconPatternID" is used
// https://github.com/256dpi/processing-mqtt








MQTTClient client;
String mqtopic = "/iRemoconPatternID" ;

final int FINDPORT = 1460 , COMMANDPORT = 51013 ;
String iRemoconAddress = "" ;
public void setup() {

  try {
    //Open a random port to send the package
    DatagramSocket c ;
    c = new DatagramSocket();
    c.setBroadcast(true);
    final byte[] sendData = {0x46,0x49,0x4e,0x44};

    println("Finding iRemocon..") ;
    DatagramPacket sendPacket = new DatagramPacket(
      sendData, sendData.length, InetAddress.getByName("255.255.255.255"), FINDPORT);
    c.send(sendPacket);

            //Wait for a response
    byte[] recvBuf = new byte[15000];
    DatagramPacket receivePacket = new DatagramPacket(recvBuf, recvBuf.length);
    c.receive(receivePacket);

    iRemoconAddress = receivePacket.getAddress().getHostAddress() ;
    println( "iRemocon found on " + iRemoconAddress );

    c.close();
  } catch (IOException ex) {}

  client = new MQTTClient(this);
  client.connect("mqtt://kadecotgallery.xyz:31313", "iRemoconOverNAT_Home");
//  client.connect("mqtt://demo:demo@connect.shiftr.io", "my-client");
  client.subscribe(mqtopic);
  // client.unsubscribe("/hello");
}

public void draw() {}

int id_to_send ;
public void messageReceived(String topic, byte[] payload) {
  int id = Integer.parseInt( new String(payload) ) ;
  println("ID: " + id);
  
            /*if( id!=350 && id!=351 && (id<300 || (314<=id&&id<321) || 325<=id) ){
               println("Out of range") ;
               return ;
            }*/
            id_to_send = id ;
            new Thread( new Runnable() {
                @Override
                public void run() {
                    Socket con ;
                    try {
                        con = new Socket (iRemoconAddress, COMMANDPORT);
                        PrintWriter out = new PrintWriter(con.getOutputStream(), true);
                        out.print("*is;" + id_to_send + "\r\n") ;
                        out.flush();
                        out.close();
                        con.close ();
                        //Log.w("IServerCommunication","Sent command : "+"*is;" + IRemoServer.this.id_to_send + "\r\n") ;
                    } catch (Exception e) {}

                }
            } ).start() ;
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "IRemoconOverNAT_Home" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
