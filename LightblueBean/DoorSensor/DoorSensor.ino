/* 
  This sketch reads the acceleration from the Bean's on-board 
  accelerometer and displays it on the Bean's LED.
    
  This example code is in the public domain.
*/

void setup() {
  // Optional: Use Bean.setAccelerationRange() to set the sensitivity 
  // to something other than the default of ±2g.
  Serial.begin(9600) ;
}

int countDown = 0 ;
int countDownTime = 5000/50 ; // 5 secs

void loop() {
  if( countDown > 0 ){
    --countDown ;
    Bean.sleep(50);
    return ;
  }
/*
  if( analogRead(A1) > 511 ){
    Serial.print( "O" ) ;
    countDown = countDownTime ;  // 5 secs
    Bean.sleep(50);
    return ;
  }
*/
  AccelerationReading accel = Bean.getAcceleration();

  double x = accel.xAxis / 1024.0 ;
  double y = accel.yAxis / 1024.0 ;
  double z = accel.zAxis / 1024.0 ;
  double len = x*x + y*y + z*z ;

  if( len > 0.072 ){
    Serial.print( "I" ) ;
    countDown = countDownTime ;  // 5 secs
    Bean.sleep(50);
    return ;
  }

  Bean.sleep(50);
}
