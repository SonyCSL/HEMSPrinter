function today() {

	var DWs = new Array('(日)','(月)','(火)','(水)','(木)','(金)','(土)');
	var Now = new Date();
	var YY = Now.getYear();
	var MM = Now.getMonth() + 1;
	var DD = Now.getDate();
	var DW = DWs[ Now.getDay() ];
	var hh = Now.getHours();
	var mm = Now.getMinutes();

	if(YY < 2000) { YY += 1900; }

	if(MM < 10) { MM = "0" + MM; }
	if(DD < 10) { DD = "0" + DD; }
	if(hh < 10) { hh = "0" + hh; }
	if(mm < 10) { mm = "0" + mm; }

	return(' ' + YY + '年' + MM + '月' + DD + '日 ' + DW + ' ' + hh + ':' + mm + ' ');
}
// 今日の年月日（曜日）
function today_ymd() {

	var DWs = new Array('(日)','(月)','(火)','(水)','(木)','(金)','(土)');
	var Now = new Date();
	var YY = Now.getYear();
	var MM = Now.getMonth() + 1;
	var DD = Now.getDate();
	var DW = DWs[ Now.getDay() ];

	if(YY < 2000) { YY += 1900; }

	if(MM < 10) { MM = "0" + MM; }
	if(DD < 10) { DD = "0" + DD; }

	return(' ' + YY + '年' + MM + '月' + DD + '日 ' + DW);
}
// 時間帯による挨拶
function hello() {
	var Now = new Date();
	var hour = Now.getHours();
	
	if(4 <= hour && hour < 10) {
		return 'おはようございます';
	}
	else if(10 <= hour && hour < 18) {
		return 'こんにちは';
	}
	else {
		return 'こんばんは';
	}
}
// 節電度の計算
function completion(current, goal) {
	var day = new Date().getDate();
	goal = goal / 30 * day;
	var result = Math.round(goal / current * 100);
	
	return result;
}

function DrawImageFile(imageFile, x, y, stretch) {
    var canvas = document.getElementById('canvasPaper');

    if (canvas.getContext) {

        var context = canvas.getContext('2d');

        var image = new Image();

imageLoadStart() ;
        image.src = imageFile + '?' + new Date().getTime();

        image.onload = function () {

            //var stretch = 233; //画像のストレッチ：後で調整する

            var srcWidth   = image.width;
            var srcHeight  = image.height;
            var destWidth  = image.width  * stretch / 100;
            var destHeight = image.height * stretch / 100;


            context.drawImage(image, 0, 0, srcWidth, srcHeight, x, y, destWidth, destHeight);
imageLoadCompleted() ;

        }

        image.onerror = function () {
            alert('Image file was not able to be loaded.');
        }

    }
}



//ここから上が追加

function DrawLeftText(text) {
    var canvas = document.getElementById('canvasPaper');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.textAlign = 'left';

        context.fillText(text, leftPosition, cursor);

        context.textAlign = 'start';
    }
}

function DrawCenterText(text) {
    var canvas = document.getElementById('canvasPaper');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.textAlign = 'center';

        context.fillText(text, centerPosition, cursor);

        context.textAlign = 'start';
    }
}

function DrawRightText(text) {
    var canvas = document.getElementById('canvasPaper');

    if (canvas.getContext) {
        var context = canvas.getContext('2d');

        context.textAlign = 'right';

        context.fillText(text, rightPosition, cursor);

        context.textAlign = 'start';
    }
}

function onDrawReceipt() {
    switch (document.getElementById('paperWidth').value) {
        case 'inch2' :
            drawReceipt(20/*font-size*/, 28, 384, 1);//fontSize, lineSpace, receiptWidth, logoScale @goto
            break;
        case 'inch3DotImpact' :
            drawReceipt(32, 32, 576, 1.5);
            break;
        default :
            drawReceipt(32, 32, 576, 1.5);
            break;
        case 'inch4' :
            drawReceipt(48, 48, 832, 2);
            break;
    }

}


function refocusFontSelectbox() {
    var fontSelectbox = document.getElementById('font');
    fontSelectbox.blur();
    fontSelectbox.focus();
}

function refocusWidthSelectbox() {
    var paperWidthSelectbox = document.getElementById('paperWidth');
    paperWidthSelectbox.blur();
    paperWidthSelectbox.focus();
}

function hint(){


	var ary = [
		'暖房は、人がいる部屋で、必要なとき、必要な場所だけ使うようにしましょう',
		'こたつの設定温度は低めに。こたつ布団のほかに上掛けと敷布団も使うようにしましょう',
		'エアコンは冬でも暖房と扇風機を併用すると、暖まった空気を循環できるようになります',
		'エアコンの室外機のまわりに物を置かないようにしましょう',
		'エアコンのフィルター掃除は月に1～2回をめどに実施しましょう',
		'照明は、人がいる部屋で必要なときだけ使いましょう',
		'照明のかさなどのホコリを落として掃除するだけで明るさがアップします',
		'明るすぎる照明は間引きましょう',
		'テレビを誰も見ていないときはスイッチを消しましょう',
		'テレビを消すときは、主電源も消しましょう',
		'テレビの画面の明るさを調整しましょう',
		'テレビの音量を必要以上に大きくしないようにしましょう',
		'冷蔵庫には熱いものは冷ましてから保存しましょう',
		'冷蔵庫にものを詰め込みすぎず、無駄な開閉・開けっ放しはしないようにしましょう',
		'冷蔵庫の設定温度を適切に保ちましょう',
		'冷蔵庫は壁から5cmほど離して設置しましょう',
		'温水洗浄便座を暖めている場合、使わないときは便座のふたを閉めましょう',
		'温水洗浄便座の温度設定を高すぎないように調整しましょう',
		'温水洗浄便座の洗浄水の水温は高すぎないように適温に調整しましょう',
		'掃除機は吸い取ったゴミがたまりすぎていないかチェックしましょう',
		'米を炊いたら炊飯器で保温せず、冷蔵庫や冷凍庫で保存して電子レンジで温め直しましょう',
		'食器洗い乾燥機はまとめ洗いしましょう',
		'長時間外出するときは、ポットのプラグを抜きましょう',
		'ドライヤーを使うときはタオルで水分をしっかり取り去ってから乾かしましょう'
	];


	return ary[Math.floor( Math.random() * ary.length )];


}

function plan() {
	var ary = [
		[
			{date: '10:30', text: 'ヨガ教室 ＠ヨガスタジオ'},
			{date: '15:00', text: 'お茶 with ママ友'},
		],
		[
			{date: '16:00', text: 'ヨガ教室 ＠東京都港区○○ビル７階 第３ヨガスタジオ'},
		],
		[
			{date: '10:00', text: 'お茶 with ママ友'},
			{date: '14:00', text: 'ヨガ教室 ＠ヨガスタジオ'},
		],
		[
			{date: '15:00', text: 'お茶 with ママ友'},
		]
	];
	return ary[Math.floor(Math.random() * ary.length)];
}
function visitor() {
	var ary = [
		{icon: 'visitor1.png', text: '11:12'},
		{icon: 'visitor2.png', text: '12:50'},
		{icon: 'visitor3.png', text: '13:01'},
	];
	return ary[Math.floor(Math.random() * ary.length)];
}


function tassei_in(average){

	if(average >= 120){

		return '今月の節電目標に対し、大幅に節電を達成していますね。この調子で、節電に取り組んでください。';
	}
	else if(average >= 90){

		return '今月の節電目標に対し、順調に節電を達成していますね。この調子で、節電に取り組んでください。';
	}
	else if(average >= 60){

		return '今月の節電目標を達成するには、もう少し努力が必要のようです。節電のヒントを参考に、節電に取り組んでみましょう。';
	}
	else{
		return '今月の節電目標を達成するには、大幅に努力が必要です。普段の生活でも、節電を意識してみましょう。';

	}
}



function tassei_out(average){

	if(average >= 120){

		return 'いつも節電を意識されていますね。';
	}
	else if(average >= 90){

		return '家電の消し忘れはありませんか？';
	}
	else if(average >= 60){

		return '外出時に使用しない家電は電源を切ってからお出掛けしましょう。';
	}
	else{
		return '節電目標に対し多くの電力を消費しています。もう一度、外出時に使用しない家電の電源が切れているか確認してみましょう。';

	}
}




var imageLoadCountdown = 0 ;
function imageLoadStart(){
	++imageLoadCountdown;
}

function imageLoadCompleted(){
	if( --imageLoadCountdown == 0 )
		onSendMessage() ;
}

function window_onload(){



	mq.goal = 23 ;
	mq.current = 14 ;
	// nowLoading();
	// onResizeCanvas();
	// return;

	mq.allPowerOff = function(){
		alert('Reqesting All Power Off!') ;
	} ;



	mq.init(function(msg){
		console.log('Demand response received.:'+JSON.stringify(msg)) ;
		//location.href="dr.html" ;
	}) ;

	mq.getPowerStatus(function(status){
		console.log('Power status callback:' + JSON.stringify(status) ) ;
		mq.goal = status.goal ;
		mq.current = status.current ;
		//nowLoading();
		//onResizeCanvas();
		mq.getUserProfile( function(re){
			mq.profile = re ;
			nowLoading();
			onResizeCanvas();
		}) ;
	}) ;



}


function myResizeCanvas(cursor){

    var canvas = document.getElementById('canvasPaper');

	canvas.height = cursor;
}










// 文字列を指定サイズに分割して配列化（複数行表示対応）
function multilineText(context, text, width) {
    var len = text.length; 
    var strArray = [];
    var tmp = "";
    var i = 0;
 
    if(len < 1) {
        return strArray; // textの文字数が0だったら終わり
    }
 
    for(i = 0; i < len; i++) {
        var c = text.charAt(i);  //textから１文字抽出
        if(c == "\n") {
            /* 改行コードの場合はそれまでの文字列を配列にセット */
            strArray.push( tmp );
            tmp = "";
            continue;
        }
 
        /* contextの現在のフォントスタイルで描画したときの長さを取得 */
        if (context.measureText(tmp + c).width <= width) {
            /* 指定幅を超えるまでは文字列を繋げていく */
            tmp += c;
        } else {
            /* 超えたら、それまでの文字列を配列にセット */
            strArray.push( tmp );
            tmp = c;
        }
    }
 
    /* 繋げたままの分があれば回収 */
    if(tmp.length > 0) {
        strArray.push(tmp);
	}
 
    return strArray;
}
