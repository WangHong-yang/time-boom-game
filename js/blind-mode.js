window.onload = function() {
	var ms = 0;
	var state = 0;
	var time = 0;
	var goal_seconds = Math.floor(Math.random()*9+1); // 随机1~10之间整数
	var goal_mSeconds = 0; // before:随机10~99之间整数Math.floor(Math.random()*90+10)  after:0
	var diff = 0; // 算差的时间
	var storage = window.localStorage; // 缓存

	// 获取切换页面
	var tips = document.getElementById("tips");
	var termpage = document.getElementById("termpage");
	var platform = document.getElementById("platform");

	// DOM
	var blind_mode_seconds = document.getElementById("blind_mode_seconds");
	var blind_mode_mSeconds = document.getElementById("blind_mode_mSeconds");
	var blind_mode_seconds_small = document.getElementById("blind_mode_seconds_small");
	var blind_mode_mSeconds_small = document.getElementById("blind_mode_mSeconds_small");
	var blind_mode_setButton = document.getElementById("blind_mode_setButton");
	var record = document.getElementById("record");
	var startBtn = document.getElementById("startBtn");
	var goalSeconds = document.getElementById("goalSeconds");
	var goalmSeconds = document.getElementById("goalmSeconds");
	var resultContent = document.getElementById("resultContent");
	var showRecordBtn = document.getElementById("showRecordBtn");
	var tryAgainBtn = document.getElementById("tryAgainBtn");
	var resultsNew = document.getElementById("resultsNew");
	var resultsOld = document.getElementById("resultsOld");
	var maxRecord1 = document.getElementById("maxRecord1");
	var maxRecord2 = document.getElementById("maxRecord2");
	var record2 = document.getElementById("record2");
	var record3 = document.getElementById("record3");
	var fenshuC = document.getElementById("fenshuC");

	if (storage.score == undefined) {
		storage.score = 100000;
	}
	if (storage.isMusic == 1) {
		$('body').append('<embed id="music" src="bgsound.mp3" autostart="true" hidden="true" loop="true">');
	}

	// tips页面
	record.innerHTML = storage.score/1000;
	startBtn.onclick = function() {
		tips.style.display = "none";
		// termpage页面
		termpage.style.display = "block";
		goalSeconds.innerHTML = goal_seconds;
		goalmSeconds.innerHTML = goal_mSeconds;
		setTimeout(function(){
			termpage.style.display = "none";
			// platform页面
			platform.style.display = "block";
			blind_mode_seconds.innerHTML = goal_seconds;
			blind_mode_seconds_small.innerHTML = goal_seconds;
			blind_mode_mSeconds.innerHTML = goal_mSeconds;
			blind_mode_mSeconds_small.innerHTML = goal_mSeconds;
			// 计时开始！
			state = 0;
			startstop();
			
		} ,2000);
	}


	function startstop() {
		if (state == 0) {
			state = 1;
			then = new Date();
			then.setTime(then.getTime() - ms); // 向then添加毫秒级时间

			// fenshuC
			blind_mode_seconds.innerHTML -= 1;
			blind_mode_mSeconds.innerHTML = 99;
			setInterval(function() {
				blind_mode_mSeconds.innerHTML -= 1;
			}, 100);
			$("#fenshuC").fadeOut(1000);

			// blind_mode_seconds.innerHTML = "-";
			// blind_mode_mSeconds.innerHTML = "--";
		} else {
			state = 0;
			now = new Date();
			ms = now.getTime() - then.getTime();
			blind_mode_seconds.innerHTML = parseInt(ms/1000); //丢弃小数部分取整
			blind_mode_mSeconds.innerHTML = (parseInt(ms/10) - 100 * parseInt(ms/1000))>9?(parseInt(ms/10) - 100 * parseInt(ms/1000)):'0'+(parseInt(ms/10) - 100 * parseInt(ms/1000)).toString();

			diff = Math.abs(10*parseInt(ms/10) - 1000*goal_seconds - 10*goal_mSeconds);
			
			$('body').append('<embed id="music" src="blind.click.mp3" autostart="true" hidden="true" loop="false">');

			if (storage.score == undefined) {
				storage.score = diff;
				platform.style.display = 'none';
				resultsNew.style.display = "block";
				resultsOld.style.display = "none";
				record2.innerHTML = diff/1000;
				record3.innerHTML = diff/1000;
				maxRecord1.innerHTML = storage.score/1000;
				maxRecord2.innerHTML = storage.score/1000;
			} else if (diff<storage.score) {
				// 创造新纪录页面
				storage.score = diff;
				$('body').append('<embed id="music" src="newRecord.mp3" autostart="true" hidden="true" loop="false">');
				resultContent.innerHTML = "<span>目标时间：</span>"+goal_seconds+"<span>.</span>"+goal_mSeconds+"<br />"+"<p>创造新纪录！</p>"+"<span>距离目标：</span>"+storage.score+"<span>毫秒</span>";
				platform.style.display = 'none';
				resultsNew.style.display = "block";
				resultsOld.style.display = "none";
				record2.innerHTML = diff/1000;
				record3.innerHTML = diff/1000;
				maxRecord1.innerHTML = storage.score/1000;
				maxRecord2.innerHTML = storage.score/1000;
			} else if (diff==storage.score) {
				$('body').append('<embed id="music" src="newRecord.mp3" autostart="true" hidden="true" loop="false">');
				resultContent.innerHTML = "<span>精准命中！<br />无懈可击！<br />赶紧秀一下吧！</span>"
				platform.style.display = 'none';
				resultsNew.style.display = "block";
				resultsOld.style.display = "none";
				record2.innerHTML = diff/1000;
				record3.innerHTML = diff/1000;
				maxRecord1.innerHTML = storage.score/1000;
				maxRecord2.innerHTML = storage.score/1000;
			} else {
				// 没创造新纪录页面
				resultContent.innerHTML = "<span>目标时间：</span>"+goal_seconds+"<span>.</span>"+goal_mSeconds+"<br />"+"<span>距离目标：</span>"+diff+"毫秒<br />"+"<span>最高纪录：</span>"+storage.score+"<span>毫秒</span>";
				platform.style.display = 'none';
				resultsNew.style.display = "none";
				resultsOld.style.display = "block";
				record2.innerHTML = diff/1000;
				record3.innerHTML = diff/1000;
				maxRecord1.innerHTML = storage.score/1000;
				maxRecord2.innerHTML = storage.score/1000;
			}

		}
	}

	

	function display() {
		if (state == 1)  {
			now = new Date();
			ms = now.getTime() - then.getTime();
		}
	}

	setInterval(display,50);
	
	blind_mode_setButton.onclick = startstop;
}
