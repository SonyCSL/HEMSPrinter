HEMS Printer�̐����r�f�I
https://youtu.be/yYnhtXYXIbQ

HEMS Printer�́A�n�[�h�E�F�A�����EWeb�A�v�����܂ރ\�����[�V�����ł���A�����̂��̂�����g�ݍ��킹�Ď��s���邱�Ƃ͂ł��܂���B���s�ɕK�v�ȃ\�t�g�E�F�A���Y��J�����͂��ׂĂ����ɗ񋓂��܂����A�S���������̂����ɂ́A�ŏI�I�ɂ͂͂񂾂Â��Ȃǂ��s���K�v������܂��B���������������B

�S�̍\����Overview.png�ɂ���܂��B

���g�p�����n�[�h�E�F�A�E�\�t�g�E�F�A

�n�[�h�E�F�A
�E���V�[�g�v�����^�@�X�^�[���� SM-S210i Amazon�ɂ�34,900�~ (2015/10/13����)
http://www.amazon.co.jp/SM-S210i%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-SM-S210i-DB40-JP-%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC-SM-S210i/dp/B00EF3IEX8
�EAndroid�[��(BLE�ڑ��\�Ȃ��̂����ڂ���Ă���Έꉞ�����͂��ł�)
�ELightblue Bean�Q�� (���$30 http://legacy.punchthrough.com/bean/buy/)
�E�œd�^�ԊO���i�l���j�Z���T�[���W���[���@�r�a�S�P�Q�`�i�H���d�q��500�~http://akizukidenshi.com/catalog/g/gM-09002/�j
�EWindows PC (�G�~�����[�^��Processing�̎��s�ɗp���܂����j
�ELED�Ɩ��������{�^���i�H�t���K�[�h����1100�~���炢�ōw���BLED��3v�ŏ\��������̂ɓ���ւ��Ă��܂��B

�\�t�g�E�F�A
�Emosquitto (MQTT Broker. Port12345���g�p)
�Enode.js (MQTT-Socket.io�̕ϊ��p.Port12346��12347���g�p�Bexpress,mqtt,socket.io�̂R�̃p�b�P�[�W�����Ă��܂��B�j
�Enginx (Web server�B�ȏ�R��AWS��ɍ\�z���܂����Bkadecotgallery.xyz:80���g�p

�EStarWebPRNT Browser �L���ŁB(Google Play�ɂ�3600�~�BAndroid�[���ɓ���Ďg���܂��j
https://play.google.com/store/apps/details?id=com.starmicronics.starwebprntpaid
�EKadecot�@�iGoogle Play���疳���ŗ��Ƃ��܂��B
https://play.google.com/store/apps/details?id=com.sonycsl.Kadecot


���g�����ihemsgallery.xyz�Ə����Ă��鏊�́Aapp/web���C���X�g�[�����ꂽ�T�[�o�[���ɓK�X�ǂݑւ��Ă��������B
�Ehemsgallery.xyz���nginx�𗧂��グ�܂��Bapache�Ƃ��ł���肠��܂���B
�Ehemsgallery.xyz���mosquitto�𗧂��グ�܂��B
mosquitto -v -p 12345
�Ehemsgallery.xyz���node.js�𗧂��グ�܂��B
node mq/runnode.js
�E�����PC��Ń_�C���n�E�X�̃G�~�����[�^�𗧂��グ�܂��B
�E����PC���Processing��HEMSPrinter2�𗧂��グ�܂��B�i�\�[�X�R�[�h����IP�A�h���X���A�G�~�����[�^�́A���Ȃ킿������IP�A�h���X�ɏ��������Ă��������j
�E�h�A�Z���T�[�ɓd�������܂��i�{�^���d�rCR2032�j�B
�E���V�[�g�v�����^�ALightblue Bean�ɓd�������܂��i��X�̎����ł́A�v�����^����d��������ă{�[�h�𓮂����Ă���̂ŁA�v�����^���������Α��v�ł��j
�E�����Android�[������Kadecot�ƁAKadecot��Lightblue Bean�v���O�C�����C���X�g�[������Kadecot�𗧂��グ�܂��BHEMSPrinter�ƁADoorSensor�Ƃ����Q��Lightblue Bean�@�킪����������OK�ł��B
�EKadecot��IP�A�h���X�𒲂ׂ܂��i�ݒ�ˊJ���҃��[�h�Ƀ`�F�b�N������΂킩��₷���ł��j
�Ehttp://kadecotgallery.xyz/KadecotBTClient.html���J���܂��BURL������?kip=[kadecot ip]��ǉ����Ă�������([Kadecot ip]�͎��ۂ�IP�A�h���X�ɕύX���Ă�������)�B�ŏ���OAuth�F�؂�����܂��B�F�؂��I�������A�f�o�b�O�R���\�[���ɋ@��ꗗ���o�Ă��邱�Ƃ��m�F���܂��B
�EAndroid�[����Bluetooth�Ƀ��V�[�g�v�����^���y�A�����O���܂��B
�EAndroid�[����StarWebPRNT Browser���C���X�g�[�����A�����グ�Đݒ��PRINTER��POS Printers����Portable Printers�ɕύX���A�e�X�g������Đ�����s���Ă��邱�Ƃ��m�F���܂��i����ł��Ȃ��ꍇ�A�v�����^��iPhone���炵������ł��Ȃ��ݒ�ɂȂ��Ă���\��������܂��j�Bhttp://kadecotgallery.xyz���J���܂��B�ŏ��̊m�F�p�ɁA�v�����^�̃{�^��������܂��B����������āA�������珀���͊����ł��B
�E�h�A�Z���T�[����������ƁA�v�����^�[��̉����{�^���X�C�b�`������܂��B����������ƈ�������͂��ł��B
�E�f�}���h���X�|���X�V�i���I�́A�ŏ��̓G�~�����[�^�̏u���d�͒l���X���b�V�����h�𒴂������Ɏ����I�ɔ�������悤�ɂ��Ă��܂������A�X���b�V�����h�l�̐ݒ肪��������̂ƁA�f�����ʂ̖ʂ���AStar WebPRNT Browser�ɕ\������Ă���{�^�����������ƂŔ�������悤�ɂȂ��Ă��܂��B�Ȃ��A�{�^���͂R�\������Ă���A�h�A�Z���T�[���Ȃ��Ă��A��V�i���I�A�O�o�V�i���I�𔭓���������悤�ɂȂ��Ă��܂��B

���J����������
�EWeb�A�v���Fweb/�t�H���_�ȉ��ɒu���Ă���܂��B���݂͓�����Ԃ�http://kadecotgallery.xyz�ȉ��ɃC���X�g�[������Ă��܂����A�����ύX�̉\��������܂��B
�@- index.html��Android�[���ɓ��ꂽStar WebPrint Browser�ŊJ�����߂�Web�A�v���ŁA�K�v�ɉ�����Bluetooth��ʂ��ăv�����^�Ɉ���M���𑗂�����AMQTT��ʂ���Lightblue Bean�ƒʐM���s���܂��B
  - KadecotBTClient.html�͔C�ӂ�PC�u���E�U�ŊJ���܂��B����l�b�g���[�N���ɑ��݂���Android�[����œ��삷��Kadecot�Ƃ�WebSocket�ŒʐM���Akadecotgallery.xyz���node.js�Ƃ�socket.io���g���ĒʐM����Hub�A�v���ƂȂ��Ă��܂��B�i�{���Ȃ�index.html��Kadecot������WebSocket�ŒʐM�ł���΂悢�̂ł����Aindex.html���J��Star Web Print Browser�ł�WebSocket�g�p�����܂������Ȃ������̂ŁAKadecot - KadecotBTClient.html - node.js - MQTT - node.js - index.html�Ƃ����܂�肭�ǂ����@�ɂȂ��Ă��܂��B�r�f�I�ŁA�{���̓N���E�h�͕s�v�A�ƌ����Ă���̂͂��������Ӗ��ł��j
�@- mq/runnode.js
node.js�p�̃v���O�����ł��B�P��socket.io��MQTT�̋��n�������邽�߂̃v���O�����ł��BMQTT������12345�|�[�g��p���Aindex.html�̂��߂�12346�|�[�g, KadecotBTClient.html�̂��߂�12347�|�[�g���J���܂��B������A�{���Ȃ�Web�A�v���ƒ���MQTT�ŒʐM�ł���΂����̂ł����Amosquitto�̃f�t�H���g�̃Z�b�g�A�b�v�ł�websocket�̃g�����X�|�[�g���MQTT���s�\�Ȃ���node.js/socket.io�����܂��邱�Ƃɂ��܂����Bstar webprnt browser��websocket�g�p�����܂������Ȃ������̂������ɗ��R�̈�ł��B

�EKadecot Lightblue Bean Plugin : lightbluebeanplugin
�@�\�j�[CSL�̃z�[���T�[�o�[Kadecot����ALightblue Bean���g����悤�ɂ���v���O�C���ł��B�{�[�h�ƃV���A���ʐM����WebSocket API��񋟂��܂��iprocedure�Ƃ���"com.sonycsl.kadecot.lightbluebean.procedure.serial"���Atopic�Ƃ���"com.sonycsl.kadecot.lightbluebean.topic.serial"��񋟂��܂��j�B�ʂ�Kadecot�Ɠ���[�����ɃC���X�g�[�����AKadecot�𗧂��グ��Ǝ����I�ɗ����オ��A���̒[����BLE����Lightblue Bean�𔭌�����Ɨ��p�ł���悤�ɂȂ�܂��B�g���u�����ɂ��Lightblue Bean�ɍĐڑ����������ꍇ�́AKadecot�̃T�[�o�[�𗎂Ƃ��������AAndroid�̐ݒ�[���A�v������A���̃v���O�C���̎��s����x��~���Ă��������B������̓s���ł��B���ꂩ��A���O�Ō̎��ʂ��s���Ă��܂��̂ŁA�����̃{�[�h�ɓ���̖��O�����Ă���ƌ듮�삵�܂��B
�EProcessing�FProcessing/HEMSPrinter2/HEMSPrinter2.pde
�@�_�C���n�E�X�񋟂̃G�~�����[�^�Ɠ���PC�ɓ���đ��点�܂��B�\�[�X�R�[�h���`����SIMULATOR_ADDR���A�G�~�����[�^��IP�A�h���X�i�܂�AProcessing�������Ă���A�����PC�̃A�h���X�j�ɕύX���Ď��s���܂��BMQTT�̃��C�u�����ihttps://github.com/256dpi/processing-mqtt�j�������Ă���K�v������܂��B
�@�G�~�����[�^�����Akadecotgallery.xyz:12345��MQTT�ɑ�������AWeb�A�v������̃��N�G�X�g�ɕԓ��������������܂��B

�ELightblue Bean�i���{�^���X�C�b�`�j�F
�@�z���F�����{�^���X�C�b�`�[�q��GND��3�ԃ|�[�g�ɂȂ��܂��B
	�{�^����LED��GND����GND�ɁAVcc����4�ԃ|�[�g�ɂȂ��܂��i������Ɩ����ł����������Ă��܂��B�{�^���d�r�œ������Ă���̂ł܂��؂��悤�ȑ�d���͗���Ȃ��̂ł͂Ǝv���Ă��܂��BGND�̑����5�ԃ|�[�g�ł����������܂��j
�@�v���O�����FLightblueBean/HEMSPrinter2/HEMSPrinter2.ino���AWindows�pBean Loader�Œ[���ɗ������݂܂��B�{�[�h�̖��O���uHEMSPrinter�v�ɂ��Ă����K�v������܂��B
   ��Lightblue Bean��Arduino�݊��{�[�h�Ȃ̂ŁA�\�[�X��Arduino�Ɠ����悤�ɓǂ߂܂��B
�ELightblue Bean�i�h�A�Z���T�[�j
�@�z���F�H���̐l���ԊO���Z���T�[�������t���Ă��܂��B�����3v�쓮���\�Ȃ̂ŁA���ʂɃ{�[�h���GND��Vcc�œd�����������A�o�͒[�q��A0�ɂȂ��ł��܂��B
�@�v���O�����FLightblueBean/DoorSensor/DoorSensor.ino�ɂ���܂��B�l���Z���T�[�����łȂ��A�{�[�h��ɍŏ�����ڂ��Ă�������x�Z���T�[��p���Ă��܂��B���փh�A�Ɏ��t���邱�Ƃ�z�肵�Ă��܂��B�l���Z���T�[����������O�ɉ����x�Z���T�[�����������ꍇ�́A�O����l�������Ă����ƍl������̂ŁA�A��M�����o���܂��B�t�ɁA�l���Z���T�[����ɔ���������O�o���悤�Ƃ��Ă���ƍl������̂ŁA�O�o�M�����o���܂��B�i��҂́A���֑|�������Ă���Ƃ��ȂǂɌ�F���̉\��������܂��j