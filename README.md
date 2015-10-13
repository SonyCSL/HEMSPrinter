#HEMS Printerとは
[![](http://img.youtube.com/vi/yYnhtXYXIbQ/0.jpg)](https://www.youtube.com/watch?v=yYnhtXYXIbQ)

#実行について
HEMS Printerは、ハードウェア実装・Webアプリも含むソリューションであり、既存のものだけを組み合わせて実行することはできません。実行に必要なソフトウェア資産や開発物はすべてここに列挙しますが、全く同じものを作るには、最終的にははんだづけなども行う必要があります。ご了承ください。

#全体構成
![Overview](https://raw.githubusercontent.com/SonyCSL/HEMSPrinter/master/Overview.png)

※この図にはKadecotBTClient.htmlが含まれていません。図があまりに複雑になるので省略しています。WindowsPC内で起動させ、Android上のDevice ServerとMQTT-Socket.io Conversion Serverとの仲介を行います。
#使用したハードウェア・ソフトウェア

##ハードウェア
+ レシートプリンタ / スター精密 SM-S210i [Amazonにて34,900円](http://www.amazon.co.jp/SM-S210i%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-SM-S210i-DB40-JP-%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%83%97%E3%83%AA%E3%83%B3%E3%82%BF%E3%83%BC-SM-S210i/dp/B00EF3IEX8) (2015/10/13現在)
+ Android端末 / BLE接続可能であれば一応動くはずです
+ Lightblue Bean２個 / 一個$30 http://legacy.punchthrough.com/bean/buy/
+ 焦電型赤外線（人感）センサーモジュールＳＢ４１２Ａ / [秋月電子で500円](http://akizukidenshi.com/catalog/g/gM-09002/)
+ Windows PC / エミュレータとProcessingの実行に用いました
+ LED照明つき押しボタン / 秋葉原ガード下で1100円くらいで購入。LEDは3vで十分光るものに入れ替えています。

##ソフトウェア
+ mosquitto / MQTT ブローカー。 12345番ポートを使用)
+ node.js / MQTT-Socket.ioの変換用.12346番ポートと12347番ポートを使用。express,mqtt,socket.ioの３つのパッケージを入れています。
+ nginx / Web server。以上３つはAWS上に構築しました。80番ポートを使用
+ StarWebPRNT Browser 有料版 / ([Google Playにて3600円](https://play.google.com/store/apps/details?id=com.starmicronics.starwebprntpaid)。Android端末に入れて使います）
+ Kadecot / [Google Playから無料で落とせます](https://play.google.com/store/apps/details?id=com.sonycsl.Kadecot)

#インストールと使い方
kadecotgallery.xyzと書いてある所は、[web/以下](https://github.com/SonyCSL/HEMSPrinter/tree/master/web)がインストールされたサーバー名に適宜読み替えてください。
+ kadecotgallery.xyz上でnginxを立ち上げます。apacheとかでも問題ありません。
+ kadecotgallery.xyz上でmosquittoを立ち上げます。
mosquitto -v -p 12345
+ kadecotgallery.xyz上でnode.jsを立ち上げます。
node [mq/runnode.js](https://github.com/SonyCSL/HEMSPrinter/tree/master/web/mq/runnode.js)
+ 宅内のPC上でダイワハウスのエミュレータを立ち上げます。
+ 同一PC上で[ProcessingのHEMSPrinter2](https://github.com/SonyCSL/HEMSPrinter/tree/master/Processing/HEMSPrinter2/HEMSPrinter2.pde)を立ち上げます。（ソースコード内のIPアドレスを、エミュレータの、すなわち自分のIPアドレスに書き換えてください）
+ ドアセンサーに電源を入れます（ボタン電池CR2032）。
+ レシートプリンタ、Lightblue Beanに電源を入れます（我々の実装では、プリンタから電源を取ってLightblue Beanを動かしているので、プリンタだけ入れれば大丈夫です）
+ 宅内のAndroid端末内にKadecotと、[KadecotのLightblue Beanプラグイン](https://github.com/SonyCSL/LightblueBeanPlugin)をインストールしてKadecotを立ち上げます。HEMSPrinterと、DoorSensorという２つのLightblue Bean機器が発見されればOKです。
+ KadecotのIPアドレスを調べます（設定⇒開発者モードにチェックを入れればわかりやすいです）
+ [http://kadecotgallery.xyz/KadecotBTClient.html](https://github.com/SonyCSL/HEMSPrinter/tree/master/web/KadecotBTClient.html)を開きます。URL末尾に?kip=[kadecot ip]を追加してください([Kadecot ip]は実際のIPアドレスに変更してください)。最初にOAuth認証があります。認証が終わったら、デバッグコンソールに機器一覧が出ていることを確認します。
+ Android端末にBluetoothでレシートプリンタをペアリングします。
+ Android端末に[StarWebPRNT Browser](https://play.google.com/store/apps/details?id=com.starmicronics.starwebprntpaid)をインストールし、立ち上げて設定のPRINTERをPOS PrintersからPortable Printersに変更し、テスト印刷して正常実行していることを確認します（印刷できない場合、プリンタがiPhoneからしか印刷できない設定になっている可能性があります）。http\://kadecotgallery.xyz/ を開きます。最初の確認用に、プリンタのボタンが光ります。これを押して、消えたら準備は完了です。
+ ドアセンサーが反応すると、プリンター上の押しボタンスイッチが光ります。それを押すと印刷されるはずです。
+ デマンドレスポンスシナリオは、最初はエミュレータの瞬時電力値がスレッショルドを超えた時に自動的に発動するようにしていましたが、スレッショルド値の設定が難しかったのと、デモ効果の面から、Star WebPRNT Browserに表示されているボタンを押すことで発動するようになっています。なお、ボタンは３つ表示されており、ドアセンサーがなくても帰宅シナリオ、外出シナリオを発動させられるようになっています。

#開発したもの
+ Webアプリ：[web/](https://github.com/SonyCSL/HEMSPrinter/tree/master/web)フォルダ以下に置いてあります。現在は動く状態でhttp://kadecotgallery.xyz/ 以下にインストールされていますが、将来変更の可能性があります。
 + index.htmlはAndroid端末に入れたStar WebPrint Browserで開くためのWebアプリで、必要に応じてBluetoothを通じてプリンタに印刷信号を送ったり、MQTTを通じてLightblue Beanと通信を行います。
 + KadecotBTClient.htmlは任意のPCブラウザで開きます。同一ネットワーク内に存在するAndroid端末上で動作するKadecotとはWebSocketで通信し、kadecotgallery.xyz上のnode.jsとはsocket.ioを使って通信するHubアプリとなっています。（本来ならindex.htmlとKadecotが直接WebSocketで通信できればよいのですが、index.htmlを開くStar Web Print BrowserではWebSocket使用がうまくいかなかったので、Kadecot - KadecotBTClient.html - node.js - MQTT - node.js - index.htmlというまわりくどい方法になっています。ビデオで、本来はクラウドは不要、と言っているのはそういう意味です）
 + mq/runnode.js
node.js用のプログラムです。単にsocket.ioとMQTTの橋渡しをするためのプログラムです。MQTT向けに12345ポートを用い、index.htmlのために12346ポート, KadecotBTClient.htmlのために12347ポートを開きます。これも、本来ならWebアプリと直接MQTTで通信できればいいのですが、mosquittoのデフォルトのセットアップではwebsocketのトランスポート上でMQTTが不可能なためnode.js/socket.ioをかませることにしました。star webprnt browserでwebsocket使用がうまくいかなかったのも微妙に理由の一つです。
+ Kadecot Lightblue Bean Plugin : [lightbluebeanplugin](https://github.com/SonyCSL/LightblueBeanPlugin)
　ソニーCSLのホームサーバーKadecotから、Lightblue Beanを使えるようにするプラグインです。ボードとシリアル通信するWebSocket APIを提供します（procedureとして"com.sonycsl.kadecot.lightbluebean.procedure.serial"を、topicとして"com.sonycsl.kadecot.lightbluebean.topic.serial"を提供します）。別のKadecotと同一端末内にインストールし、Kadecotを立ち上げると自動的に立ち上がり、その端末のBLEからLightblue Beanを発見すると利用できるようになります。トラブル等によりLightblue Beanに再接続をしたい場合は、Kadecotのサーバーを落としたうえ、Androidの設定ー＞アプリから、このプラグインの実行も一度停止してください。実装上の都合です。それから、名前で個体識別を行っていますので、複数のボードに同一の名前がついていると誤動作します。
+ Processing：[Processing/HEMSPrinter2/HEMSPrinter2.pde](https://github.com/SonyCSL/HEMSPrinter/tree/master/Processing/HEMSPrinter2/HEMSPrinter2.pde)
　ダイワハウス提供のエミュレータと同じPCに入れて走らせます。ソースコード内冒頭のSIMULATOR_ADDRを、エミュレータのIPアドレス（つまり、Processingも走っている、同一のPCのアドレス）に変更して実行します。MQTTのライブラリ（https\://github.com/256dpi/processing-mqtt ）が入っている必要があります。
　エミュレータ情報を、kadecotgallery.xyz:12345のMQTTに送ったり、Webアプリからのリクエストに返答する役割があります。
+ Lightblue Bean（押ボタンスイッチ）：
 + 配線：押しボタンスイッチ端子はGNDと3番ポートにつなぎます。
	ボタンのLEDはGND側をGNDに、Vcc側を4番ポートにつなぎます（ちょっと無茶ですが直結しています。ボタン電池で動かしているのでまぁ切れるような大電流は流れないのではと思っています。GNDの代わりに5番ポートでも多分動きます）
 + プログラム：[LightblueBean/HEMSPrinter2/HEMSPrinter2.ino](https://github.com/SonyCSL/HEMSPrinter/tree/master/LightblueBean/HEMSPrinter2/HEMSPrinter2.ino)を、Windows用Bean Loaderで端末に流し込みます。ボードの名前を「HEMSPrinter」にしておく必要があります。
   ※Lightblue BeanはArduino互換ボードなので、ソースはArduinoと同じように読めます。
+ Lightblue Bean（ドアセンサー）
 + 配線：秋月の人感赤外線センサーだけ取り付けています。これは3v駆動が可能なので、普通にボード上のGNDとVccで電源を供給し、出力端子はA0につないでいます。
 + プログラム：[LightblueBean/DoorSensor/DoorSensor.ino](https://github.com/SonyCSL/HEMSPrinter/tree/master/LightblueBean/DoorSensor/DoorSensor.ino)にあります。人感センサーだけでなく、ボード上に最初から載っている加速度センサーを用いています。玄関ドアに取り付けることを想定しています。人感センサーが反応する前に加速度センサーが反応した場合は、外から人が入ってきたと考えられるので、帰宅信号を出します。逆に、人感センサーが先に反応したら外出しようとしていると考えられるので、外出信号を出します。（後者は、玄関掃除をしているときなどに誤認識の可能性があります）
