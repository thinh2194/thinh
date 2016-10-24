"use strict";

// chá»‰nh sá»­a
var accept_number = 8; // sá»‘ ngÆ°á»i Ä‘á»“ng Ă½ káº¿t báº¡n 1 láº§n
var accept_all = 50; // tá»•ng sá»‘ Ä‘á»“ng Ă½ káº¿t báº¡n sau 1 lÆ°á»£t xá»­ lĂ­
var accept_seconds = 1; // thá»i gian Ä‘á»“ng Ă½ káº¿t báº¡n tá»« x Ä‘áº¿n x+10 giĂ¢y

var suggest_number = 8; // sá»‘ ngÆ°á»i káº¿t báº¡n trong 1 láº§n load
var suggest_all = 50; // tá»•ng sá»‘ káº¿t báº¡n sau 1 lÆ°á»£t xá»­ lĂ­


var like_all = 15; // tá»•ng sá»‘ káº¿t báº¡n sau 1 lÆ°á»£t xá»­ lĂ­
var comment_all = 15; // tá»‘ng sá»‘ comment sau 1 lÆ°á»£t xá»­ lĂ­
var notification_all = 15; // tá»•ng sá»‘ check newfeeds sau 1 lÆ°á»£t xá»­ lĂ­

// khĂ´ng Ä‘Æ°á»£c chá»‰nh sá»­a
var check_add = 1;
var check_1000 = 0;
var check_all = 1;
var div = 0;
var action = 0;
var sleep_seconds = 0;
var tmp_page = 0;
var my_timeout = 0;
var auto_stop = 0;

var prev_check = 0;

// -------------------------------------------------------------------------------------------------
// class xá»­ lĂ­ tá»± Ä‘á»™ng
//
//
class auto_run {

	constructor() {

	}

	// tá»± Ä‘á»™ng chuyá»ƒn action
	static auto( seconds_add ) {
		
		// Ä‘Ă³ng thĂ´ng bĂ¡o lá»—i náº¿u cĂ³
		click_close_popup();

		// kiem tra loi
		if ( check_error() === false ) {

			console.log('ERROR: - - - wait to fix ... - - - ');
			go_newfeeds(1);
			auto_run.next();

			setTimeout( function(){
				auto_run.auto(0);
			}, 5000);

			return false;
		}


		// kiá»ƒm tra dá»«ng chÆ°Æ¡ng trĂ¬nh
		if ( auto_stop === 1 ) {

			console.log('INFO: - - - stop stop stop stop stop - - - ');
			return false;
		}
		
		// callback vá»›i thá»i gian
		sleep_seconds = Math.floor((Math.random() * 10) + accept_seconds + seconds_add)  * 1000;
		if ( window.location.pathname === "/xti.php" ) {
			return false;
		}
		console.log('INFO: - - - sleep: ' + sleep_seconds );

		// chá»n action Ä‘á»ƒ cháº¡y
		this.tmp_action = action % 3;

		console.log('INFO: - current action: ' + this.tmp_action);
		switch( this.tmp_action ) {

			// action Ä‘á»‘ng Ă½ káº¿t báº¡n
			case 0: 
				go_page_suggest();
				setTimeout( m_suggest_friends, sleep_seconds); 
				break;
				
			case 1:
				go_page_accepts();
				setTimeout( m_accepts_friends, sleep_seconds); 
				break;

			case 2:

				if ( go_newfeeds(0) === false ) {
					break;
				}
				setTimeout( m_newfeeds, sleep_seconds); 
				break;

			case 3:
				go_notification();
				setTimeout( m_notification, sleep_seconds); 
				break;
			default:
				console.log('INFO: ------ complete -------');
				this.next();
				this.auto(0);
				break;
		}

	}

	// chuyá»ƒn sang action káº¿ tiáº¿p
	static next() {

		console.log('INFO: NEXT');
		check_all = 1;
		tmp_page = 0;
		action++;

		if ( action >= 50 ) {

			console.log('INFO: ------ reload page - reload page - reload page -------');
			location.reload(true);
		}
	}

	// chuyá»ƒn sang action káº¿ tiáº¿p
	static prev() {

		console.log('INFO: PREV');
		check_all = 1;
		tmp_page = 0;
		action--;

		if ( action >= 50 ) {

			console.log('INFO: ------ reload page - reload page - reload page -------');
			location.reload(true);
		}
	}

}

window.onload = function(){ auto_run.auto(0); };

// ----------------------------------------------------------------------------------------------------------------
// check notification
//
//
function go_notification() {

	var inputs2 = document.querySelector('div#notifications_jewel a'); 
	if ( inputs2 !== null) {
		inputs2.click();
	}

}

// ----------------------------------------------------------------------------------------------------------------
// lÆ°á»›t notification
// 
//
function m_notification() {
	
	console.log('RUN: Check notification');

	div = document.querySelector('._7k7.inner._1azv')
	var btn_clic = div.querySelector('li.aclb a.touchable');
	if (btn_clic !== null) {

		btn_clic.click();
		
		setTimeout( function(){

			console.log('DEBUG: - - - begin click like: ' + check_all);
			click_button_like_post( 'a._15ko._5a-2:not(._2q8z)' );
			auto_run.auto(3);

		}, 5000 );
		
	} else {

		console.log('INFO: - - - cant find');
		check_all = suggest_all;
		auto_run.next();
		
		setTimeout( function(){
			auto_run.auto(3);
		}, 2000 );
	}
		

	if ( check_all++ > notification_all) { 
		check_all = 1;
		auto_run.next();
	}

}


// ----------------------------------------------------------------------------------------------------------------
// di chuyá»ƒn tá»›i trang newfeeds
//
function go_newfeeds( check1) {

	var currentLocation = window.location;

	if ( currentLocation.pathname === "/xti.php" ) {
		return false;
	}

	if ( currentLocation.pathname === "/home.php" ) {
		return true;
	} else {
		tmp_page = 0;
	}

	if (tmp_page !== 0 && check1 === 0) { 

		return true; 
	}
	if (tmp_page === 0) {
		tmp_page = 1;
	}

	var inputs2 = document.querySelector('div#feed_jewel a'); 
	if ( inputs2 !== null) {
		inputs2.click();
	}

}

// ----------------------------------------------------------------------------------------------------------------
// newfeeds like 
//
function m_newfeeds() {

	console.log('RUN: Like');

	// nháº¥n nĂºt like
	var div_like = click_button_like( 'a._15ko._5a-2:not(._2q8z)' );
	var check_auto = 0;

	if ( div_like === false  ) {

		console.log( 'INFO: - - - het like: :' + check_all);
		go_newfeeds(0);
		window.scrollTo( 0, document.body.scrollHeight);
		
	} else {

		// them vao comment
		if ( m_newfeeds_comment( div_like ) === false ) {
			auto_run.auto(0);
		}

		// kiá»ƒm tra tá»•ng káº¿t báº¡n
		console.log('INFO: - - - processed: ' + check_all);

		check_auto = 1;
	}


	if ( check_all++ >= like_all) { 
		check_all = 1;
		auto_run.next();
	}

	// check call auto náº¿u bá»‹ lá»—i háº¿t like
	if ( check_auto === 0 ) {
		auto_run.auto(5);
	}

}

// ----------------------------------------------------------------------------------------------------------------
// newfeeds comment
//
function m_newfeeds_comment( div_like ) {

	// kiá»ƒm tra comment lĂ  hĂ¬nh áº£nh,
	var random_comment = Math.floor((Math.random() * 10));
	var check_comment = false;

	// tá»‰ lá»‡ 1/5
	if ( random_comment < 6) {
		return false;
	}

	console.log('RUN: Comment: check ');

	// check check check
	var inputs2 = div_like.querySelector( 'article_56be._4hkg._5rgr._5s1m' ); 
	// check shared
	if (inputs2 === null) {

		// check hĂ¬nh áº£nh
		inputs2 = div_like.querySelector( 'i.img._5sgi.img._4s0y' ); 
		if (inputs2 === null) {

			console.log("DEBUG: status don't has image");
			return false;
		}

		// kiá»ƒm tra quáº£ng cĂ¡o
		inputs2 = div_like.querySelector( 'header._5rgs._5sg5' ); 
		if (inputs2 !== null) {
			console.log("DEBUG: status don't comment ads");
			return false;
		}
		
	}

	
	console.log('RUN: Comment: doing');

	// get text comment
	var txt_comment = get_text_comment();

	// vĂ o page status bĂ¬nh luáº­n
	inputs2 = div_like.querySelector( '._15kq._5a-2' ); 
	if (inputs2 === null) {
		return false;
	}
	inputs2.click();

	// bĂ¬nh luáº­n
	my_timeout = setInterval( function(){

		window.scrollTo( 0, document.body.scrollHeight);
		// bĂ¬nh luáº­n
		document.getElementById("composerInput").value = txt_comment;
		document.querySelector( 'input[name="comment_text"]').value = txt_comment;

		var btn_comment = document.querySelector('button._54k8._56bs._3lmf._56bt');
		btn_comment.removeAttribute('disabled');
		btn_comment.click();

		console.log("INFO: - - - commented ");

	}, 3000 );


	// quay vá» trang home & tiáº¿p tá»¥c
	setInterval( function(){

		clearInterval(my_timeout);
		//window.history.back();
		go_newfeeds(1);

		auto_run.auto(0);
	}, 8000);
	
	return true;
}


// ----------------------------------------------------------------------------------------------------------------
// chuyá»ƒn tá»›i trang gá»£i Ă½ káº¿t báº¡n
//
function go_page_suggest() {

	if (tmp_page !== 0) { return true; }
	

	var inputs2 = document.querySelector('a[data-autoid="autoid_3"]'); 
	if ( inputs2 !== null) {
		inputs2.href = "";
		inputs2.click();
	}
	
	inputs2 = document.querySelector('header._52je._52jb._52jh._4g33._52we._2pi8._2pi4 a.button.touchable'); 
	if ( inputs2 !== null) {
		inputs2.click();
	} 

	inputs2 = document.querySelector('a[href="/friends/center/suggestions/?mff_nav=1&fb_ref=jwl"]'); 

	if ( inputs2 === null) {
		inputs2 = document.querySelector('div.scrollAreaBody a'); 
	}

	if ( inputs2 !== null) {
		inputs2.href = "";
		inputs2.click();
		tmp_page = 1;

		return true;
	}
	console.log("ERROR: can't find button suggest ... waiting!...");

}

// ----------------------------------------------------------------------------------------------------------------
// func: káº¿t báº¡n theo gá»£i Ă½
//
function m_suggest_friends() {

	if (tmp_page === 0) {
		auto_run.auto(0);

		console.log("ERROR: - - - suggest can't run ... waiting!... ");
		return false;
	}

	// kiem tra limit 5000 friends
	if ( check_5000_friend() === false ) {

		console.log('INFO: - - - completed 5.000 friends - - - ');
		click_close_popup();
		return false;
	}

	// xĂ¡c nháº­n káº¿t báº¡n khi cĂ³ popup há»i
	if ( check_confirm_add() === false ) {

		console.log('INFO: - - - confirm suggest ');
		auto_run.auto(0);
		return false;
	}

	console.log('RUN: Suggest');
	div = get_div('div[data-sigil="m-add-friend-secondary"] > div[data-sigil="m-add-friend-flyout"]:not(.clk)');

	// kiá»ƒm tra giá»›i háº¡n 1000 láº§n káº¿t báº¡n
	if ( check_limit_add() === false) {
		console.log('ERROR: - - - add friend limit 1.000: ' + check_all);
		reset_all();
		check_all = suggest_all;

	} else {

		// nháº¥n nĂºt káº¿t báº¡n
		if (click_button( div , '._54k8._56bs._56bu') === false) {
			check_all = suggest_all;
		}

		// kiá»ƒm tra sá»‘ láº§n Ä‘á»“ng Ă½ Ä‘á»ƒ refresh Ä‘á»“ng Ă½ láº¡i
		if ( check_add++ > suggest_number ) {
			
			// reset value
			reset_all();
			// quay láº¡i trang Ä‘á»“ng Ă½ káº¿t báº¡n
			go_link('a._58f0._4_d1._510i');
		}
		// kiá»ƒm tra tá»•ng káº¿t báº¡n
		console.log('INFO: - - - process: ' + check_all);
	}
	
	
	if ( check_all++ >= suggest_all) { 
		check_all = 1;
		auto_run.next();
	}
	auto_run.auto(0);
}

// ----------------------------------------------------------------------------------------------------------------
// chuyá»ƒn tá»›i trang Ä‘á»“ng Ă½ káº¿t báº¡n
//
function go_page_accepts() {

	if (tmp_page !== 0) { return true; }
	

	var inputs2 = document.querySelector('a[data-autoid="autoid_3"]'); 
	if ( inputs2 !== null) {
		inputs2.href = "";
		inputs2.click();
	}
	

	inputs2 = document.querySelector('header._52je._52jb._52jh._4g33._52we._2pi8._2pi4 a.button.touchable');
	if ( inputs2 !== null) {
		inputs2.click();
	}
	
	inputs2 = document.querySelector('a[href="/friends/center/requests/?mff_nav=1&fb_ref=jwl"]'); 


	if ( inputs2 === null) {
		inputs2 = document.querySelectorAll('div.scrollAreaBody a'); 
		inputs2 = inputs2[2];
	}

	if ( inputs2 !== null) {
		inputs2.href = "";
		inputs2.click();
		tmp_page = 1;

		return true;
	}

	return false;

}

// ----------------------------------------------------------------------------------------------------------------
// func: Ä‘á»“ng Ă½ káº¿t báº¡n
//
function m_accepts_friends() {

	if (tmp_page === 0) {

		console.log("ERROR: - - - accept can't run ... waiting!... ");
		auto_run.auto(0);
		return false;
	}

	// kiem tra limit 5000 friends
	if ( check_5000_friend() === false ) {

		console.log('INFO: - - - completed 5.000 friends - - - ');
		click_close_popup();
		return false;
	}

	// xĂ¡c nháº­n káº¿t báº¡n khi cĂ³ popup há»i
	if ( check_confirm_add() === false ) {

		console.log('INFO: - - - confirm accept friend ');
		auto_run.auto(0);
		return false;
	}

	console.log('RUN: Friend accept');
	div = get_div('div._4g33._22pd[data-sigil="m-optimistic-response-action"]:not(.clk)');

	// nháº¥n nĂºt káº¿t báº¡n
	if (click_button( div , '._54k8._56bs._56b_._3cqr._5uc2._56bu') === false) {
		check_all = accept_all;

		if ( prev_check === 0 ) {
			check_all = 1;
			auto_run.prev();
			auto_run.auto(0);
			prev_check = 1;
			return false;
		} else {
			prev_check = 0;
		}
		
	}

	// kiá»ƒm tra sá»‘ láº§n Ä‘á»“ng Ă½ Ä‘á»ƒ refresh Ä‘á»“ng Ă½ láº¡i
	if ( check_add++ > accept_number ) {
		
		// reset value
		reset_all();
		// quay láº¡i trang Ä‘á»“ng Ă½ káº¿t báº¡n
		go_link('a._58f0._4_d1._510i');
	}
	// kiá»ƒm tra tá»•ng káº¿t báº¡n
	console.log('INFO: - - - process: ' + check_all);
	if ( check_all++ >= accept_all) { 
		check_all = 1;
		auto_run.next();
	}
	auto_run.auto(0);
}


// nháº¥n 1 nĂºt xá»­ lĂ­ theo div -> class
function click_button( div , div_sub) {

	// láº·p 1 láº§n -> set Ä‘Æ°á»£c thá»i gian
	var j = 0;
	for( var i=0; i < div.length; i++ )  {
		if ( div[i].style.display == 'none') {continue; } 

		div[i].className += " clk";
		var inputs = div[i].querySelector(div_sub); 
		inputs.click(); 

		console.log('INFO: - - - click button');

		inputs.scrollIntoView();

		return true;
		if (++j > 0) {break; } 
	} 

	return false;
}

// nháº¥n nĂºt like, loáº¡i bá» nhá»¯ng nĂºt Ä‘Ă£ like
function click_button_like( div_sub ) {

	var status_box = document.querySelectorAll("article._55wo._5rgr._5gh8");
	var btn_like;
	//var btn_like = document.querySelectorAll(div_sub);

	var j = 0;
	for( var i=0; i < status_box.length; i++ )  {

		btn_like = status_box[i].querySelector(div_sub)

		if ( btn_like === null ) {
			continue;
		}

		btn_like.click(); 
		btn_like.scrollIntoView();

		return status_box[i];
		if (++j > 0) {break; } 
	} 

	return false;
}

// nháº¥n nĂºt like, loáº¡i bá» nhá»¯ng nĂºt Ä‘Ă£ like
function click_button_like_post( div_sub ) {

	var btn_like = document.querySelector(div_sub)
	if ( btn_like === null ) {
		return false;
	}
	btn_like.click(); 
	btn_like.scrollIntoView();
	return true;
}

// get div
function get_div(div_name) {
	return document.querySelectorAll(div_name);
}

// go link 
function go_link(div_name) {
	
	var inputs2 = document.querySelector(div_name); 
	if (inputs2 === null) {
		return false;
	}
	inputs2.href = "";
	inputs2.click();
}

// Ä‘Ă³ng thĂ´ng bĂ¡o lá»—i
function click_close_popup() {
	var inputs2 = document.querySelector('button[data-sigil="touchable m-error-overlay-done"]'); 
	if ( inputs2 === null) {
		return false;
	}
	inputs2.click();
}

// kiem tra loi xay ra
function check_error() {

	return true;
	// FIXME
	var inputs2 = document.querySelector('div._55wr.acr.apm.abb'); 
	if ( inputs2 === null) {
		return true;
	}
	return false;
}

// kiem tra limit 5000 friend
function check_5000_friend() {

	var input_check = 0;
	input_check = document.querySelector('div._52jj._3vjl ._3vjm');
	if ( input_check === null) {

		return true;
	}

	if ( input_check.innerText.search("5,000") > 1 ||  input_check.innerText.search("5.000") > 1) {
		return false;
	}

	if ( input_check.innerText.search("we're having trouble adding") > 1) {
		return false;
	}
	return true;
}

function check_limit_add() {

	if ( check_1000 === 1 ) {
		return false;
	}
	// kiá»ƒm tra giá»›i háº¡n 1000 láº§n káº¿t báº¡n
	var check_limit_add = document.querySelector('div._55wr ._54k8._56bs._56b_._56bu'); 
	if ( check_limit_add !== null) {

		if ( check_limit_add.innerText.search("1,000") > 1 ||  check_limit_add.innerText.search("1.000") > 1) {
			check_1000 = 1;
			return false;
		}

	}

	return true;
}

// click xĂ¡c nháº­n quen biáº¿t Ä‘á»ƒ káº¿t báº¡n
function check_confirm_add() {

	var input_check = 0;
	input_check = document.querySelector('form._55-k button._54k8._56bs._56b_._56bu');
	if ( input_check !== null) {
		input_check.click();
		return false;;
	} 

	input_check = document.querySelector('form button.btn.btnC.mfss.touchable');
	if ( input_check !== null) {
		input_check.click();
		return false;;
	} 

	return true;
}

// reset láº¡i cĂ¡c giĂ¡ trá»‹ táº¡m
function reset_all() {

	div = 0; 
	check_add = 1;
}

// stop auto
function auto_stop() {
	auto_stop = 1;
}

// random text comment
function get_text_comment() {

	var txt_comment = ["Pretty",
"Very nice",
"You are beautiful",
"Meaning",
"have a nice day",
"How are you?",
"Howâ€™re you doing?",
"Howâ€™s everything?",
"Howâ€™s everything going?",
"How are things?",
"Howâ€™s your life?",
"Whatâ€™s the lastest?",
"What are you doing these days?",
"What is going on?",
"Whatâ€™s up?",
"How is it going today?",
"Hi! How are you today?",
"Good morning,",
"Tks",
"If you love life. Life will love you back",
"Iâ€™ve never seen a smiling face that was not beautiful",
"Once you choose hope, anythingâ€™s possible.",
"ib me",
"good afternoon",
"good evening",
"have a good weekend!",
"have a nice day!",
"see you later!",
"see you soon!",
"see you!",
"How is everything?",
"Howâ€™s everything going?",
"How have you been keeping?",
"I trust that everything is well.",
"How have you been",
"How do you do",
"How's your day? How's your day going"
];


	return txt_comment[ Math.floor(Math.random() * txt_comment.length) ];
}