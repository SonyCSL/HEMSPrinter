/* 
  This sketch uses the Bean library to blink the on-board RGB LED. 
  
  Notes:
    - This is not a low-power sketch 
    - A Bean with a low battery might show a faint blue and green LED color
  
  This example code is in the public domain.
*/

void setup() {
    Serial.begin(9600);
    pinMode(5, OUTPUT);
    pinMode(4, OUTPUT);
    pinMode(3, INPUT_PULLUP);
    digitalWrite(5, LOW);
}

boolean bBlink = false ;
int prevButtonState = -1 ;

boolean bBlinkLight = false ;
boolean blinkTimeCountdown = 0 ;
void loop() {
  if( bBlink ){
    if( blinkTimeCountdown-- == 0 ){
      blinkTimeCountdown = 10 ;
      bBlinkLight = !bBlinkLight ;
      digitalWrite(4, bBlinkLight?HIGH:LOW);   // turn the LED on (HIGH is the voltage level)
    }
  }

  int buttonState = digitalRead(3) ;
  if( buttonState != prevButtonState ){
    prevButtonState = buttonState ;
    Serial.print(buttonState) ;
  }

  if (Serial.available()) {
    char inChar = (char)Serial.read();
    bBlink = ( inChar == 0x31 ) ; // '1'
    if( !bBlink )
      digitalWrite(4, LOW); // off
  }

  delay(100) ;
}
