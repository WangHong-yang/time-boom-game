window.onload = function() {
	var ms = 0;
	var ps = 0; // 相比起ms，ps是未经处理过的时间差值
	var state = 0;
	var time = 0;
	var storage = window.localStorage; // 缓存, storage.classic_score = X.X秒
	var goals = []; // 目标时间点
	var goal_index = 0;
	var tag = 0; // 防止误判第一个点到第二个点之间
	var isZanTing = 7;


	var classic_mode_seconds = document.getElementById("classic_mode_seconds");
	var classic_mode_mSeconds = document.getElementById("classic_mode_mSeconds");
	var classic_mode_setButton = document.getElementById("classic_mode_setButton");
	var startBtn = document.getElementById("startBtn");
	var resultContent = document.getElementById("resultContent");
	var record = document.getElementById("record");
	var record2 = document.getElementById("record2");
	var record3 = document.getElementById("record3");
	var maxRecord1 = document.getElementById("maxRecord1");
	var maxRecord2 = document.getElementById("maxRecord2");
	var timeDot = document.getElementById("timeDot");
	var timeDots = timeDot.getElementsByTagName("span");
	var drawDot = document.getElementById("drawDot");
	var drawDots = drawDot.getElementsByTagName("span");
	var resultsNew = document.getElementById("resultsNew");
	var resultsOld = document.getElementById("resultsOld");
	var biaopan = document.getElementById("biaopan");
	var clickShare = document.getElementsByClassName("clickShare");
	var icon_medium_plus = document.getElementsByClassName("icon-medium-plus");
	var go = document.getElementById("go");
	var hoverAll = document.getElementById("hoverAll");
	var startStopB = document.getElementById("startStopB");
	var innerStatStopBtn = document.getElementById("innerStatStopBtn");
	var stopContinue = document.getElementById("stopContinue");
	var stopDownBtn = document.getElementById("stopDownBtn");


	if (storage.classic_score==undefined) {
		storage.classic_score = 0;
	}
	if (storage.isMusic == 1) {
		$('body').append('<embed id="music" src="bgsound.mp3" autostart="true" hidden="true" loop="true">');
	}

	// 给每个时间点一个随机量：+-0.2秒
	for (var i=1; i<timeDots.length-1; i++) {
		timeDots[i].innerHTML = Math.round((parseFloat(timeDots[i].innerHTML) + (Math.floor(Math.random()*5-2))/10)*10)/10;
	}
	for (var i=0; i<timeDots.length-1; i++) {
		// 生成goals值
		goals[i] = parseFloat(timeDots[i+1].innerHTML);
	}

	for (var i=0; i<timeDots.length; i++) {
		// 确定时间点标记的位置
		timeDots[i].style.left = parseFloat(timeDots[i].innerHTML) * 290 + 'px';
		drawDots[i].style.left = parseFloat(timeDots[i].innerHTML) * 290 + 'px';
	}

	//storage.classic_score = 0;
	timeDots[0].style.color='#1F1F1F'; // 开始0那个点是黑的

	record.innerHTML = storage.classic_score;
	startBtn.onclick = function() {
		tips.style.display = "none";
		platform.style.display = "block";
		classic_mode_setButton.onclick();
	}

	function startstop() {
		if (state == 0) {
			state = 1;
			then = new Date();
			then.setTime(then.getTime() - ps);

			if(isZanTing != 0) {
				// 表盘缩放
				if(go.style.display != "block") {
					$("#biaopan").animate({height:'310px', opacity: '0.5',marginTop: "-=14", marginLeft: "-=18"}, 200);
					$("#biaopan").animate({height:'282px', opacity:'1',marginTop: "+=14", marginLeft: "+=18"},200);
				}
				// 颜色变掉
				timeDots[0].style.color='#FEF014';
				timeDots[1].style.color='#1F1F1F';
				// 向左移动
				timeDot.style.left = timeDot.offsetLeft - (goals[goal_index]) * 295 +'px';
				drawDot.style.left = drawDot.offsetLeft - (goals[goal_index]) * 285 +'px';
			}
			
		} else if (isZanTing == 1) {
			state = 0;
			isZanTing = 0;
			now = new Date();
			// 速度分级
			ps = now.getTime() - then.getTime();
			if (goal_index >= 0 && goal_index <= 1) {
				ms = (now.getTime() - then.getTime())/4;
			} else if (goal_index >= 2 && goal_index <= 6) {
				//alert((now.getTime()-then.getTime()-goals[1]*2.5)/2);
				ms = goals[1]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4)/3.5;
			} else if (goal_index >= 7 && goal_index <= 11) {
				ms = goals[6]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5)/3;
			} else if (goal_index >= 12 && goal_index <= 16) {
				ms = goals[11]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3)/2.5;
			} else if (goal_index >= 17 && goal_index <= 21) {
				ms = goals[16]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5)/2;
			} else if (goal_index >= 22 && goal_index <= 26) {
				ms = goals[21]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5-(goals[21]-goals[16])*1000*2)/1.5;
			} else if (goal_index >= 27) {
				// 14是上一个else-if的条件上限，现在减去最初的时间差需要减去第一分段的2.5倍加上第二分段的2倍减去第三分段的1.5倍再除上本段的速度倍数即可
				ms = goals[26]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5-(goals[21]-goals[16])*1000*2-(goals[26]-goals[21])*1000*1.5)/1.02;
			}
			classic_mode_seconds.innerHTML = parseInt(ms/1000); //丢弃小数部分取整
			classic_mode_mSeconds.innerHTML = parseInt(ms/100) - 10 * parseInt(ms/1000);
		} else {
			state = 0;
			now = new Date();

			// 表盘缩放
			$("#biaopan").animate({height:'310px', opacity: '0.5',marginTop: "-=14", marginLeft: "-=18"}, 200);
			$("#biaopan").animate({height:'282px', opacity:'1',marginTop: "+=14", marginLeft: "+=18"},200);

			// 速度分级
			ps = now.getTime() - then.getTime();
			if (goal_index >= 0 && goal_index <= 1) {
				ms = (now.getTime() - then.getTime())/4;
			} else if (goal_index >= 2 && goal_index <= 6) {
				//alert((now.getTime()-then.getTime()-goals[1]*2.5)/2);
				ms = goals[1]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4)/3.5;
			} else if (goal_index >= 7 && goal_index <= 11) {
				ms = goals[6]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5)/3;
			} else if (goal_index >= 12 && goal_index <= 16) {
				ms = goals[11]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3)/2.5;
			} else if (goal_index >= 17 && goal_index <= 21) {
				ms = goals[16]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5)/2;
			} else if (goal_index >= 22 && goal_index <= 26) {
				ms = goals[21]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5-(goals[21]-goals[16])*1000*2)/1.5;
			} else if (goal_index >= 27) {
				// 14是上一个else-if的条件上限，现在减去最初的时间差需要减去第一分段的2.5倍加上第二分段的2倍减去第三分段的1.5倍再除上本段的速度倍数即可
				ms = goals[26]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5-(goals[21]-goals[16])*1000*2-(goals[26]-goals[21])*1000*1.5)/1.02;
			}
			classic_mode_seconds.innerHTML = parseInt(ms/1000); //丢弃小数部分取整
			classic_mode_mSeconds.innerHTML = parseInt(ms/100) - 10 * parseInt(ms/1000);

			
			if (parseInt(ms/100)/10 == goals[goal_index]) {
				goal_index += 1;
				tag = 1;
				state = 1;
				startstop;
				// 颜色变掉
				timeDots[goal_index].style.color = '#FEF014';
				timeDots[goal_index+1].style.color = '#1F1F1F';

				// 点向左走
				timeDot.style.left = timeDot.offsetLeft - (goals[goal_index]-goals[goal_index-1]) * 285 +'px';
				drawDot.style.left = drawDot.offsetLeft - (goals[goal_index]-goals[goal_index-1]) * 285  +'px';

				// 音效
				if (storage.isSound == 1) {
					//$('embed').remove();
	        		$('body').append('<embed src="success.wav" autostart="true" hidden="true" loop="false">');
				}

			} else if (parseInt(ms/100)/10 > goals[goal_index-1] && tag==1) {

				// 音效
				if (storage.isSound == 1) {
					//$('embed').remove();
	        		$('body').append('<embed src="loss.mp3" autostart="true" hidden="true" loop="false">');
	        	}

				platform.style.display = 'none';
				if (parseInt(ms/100)/10 > storage.classic_score) {
					if (goals[goal_index-1] == storage.classic_score) {
						resultContent.innerHTML = "<p>没能创造新纪录1</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
						record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
						maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
						resultsOld.style.display = "block";
					} else if (goals[goal_index-1] > storage.classic_score) {
						// 排除在第一个时刻点之前产生的误判  条件：parseInt(ms/100)/10 > goals[0]
						storage.classic_score = goals[goal_index-1];
						$('body').append('<embed id="music" src="newRecord.mp3" autostart="true" hidden="true" loop="false">');
						resultContent.innerHTML = "<p>创造新纪录！</p>"+"<span>新的纪录：</span>"+storage.classic_score+"<span>秒</span>";
						record2.innerHTML = storage.classic_score;
						maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
						resultsNew.style.display = "block";
					} else {
						resultContent.innerHTML = "<p>没能创造新纪录1</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
						record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
						maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
						resultsOld.style.display = "block";
					}
				} else {
					// 没创造新纪录页面
					resultContent.innerHTML = "<p>没能创造新纪录TAT</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
					record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
					maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
					resultsOld.style.display = "block";
				}
			} else {
				// 音效
				if (storage.isSound == 1) {
					//$('embed').remove();
	        		$('body').append('<embed src="loss.mp3" autostart="true" hidden="true" loop="false">');
	        	}


				platform.style.display = 'none';
				// 没创造新纪录页面
					resultContent.innerHTML = "<p>没能创造新纪录哦哦哦哦</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
					record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
					maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
					resultsOld.style.display = "block";
			}
		}
	}

	// function swreset() {
	// 	state = 0;
	// 	ms = 0;
	// 	classic_mode_seconds.value = parseInt(ms/1000); //丢弃小数部分取整
	// 	classic_mode_mSeconds.value = parseInt(ms/100) - 10 * parseInt(ms/1000);
	// }

	function display() {
		if (state == 1)  {
			now = new Date();
			// 速度分级
			ps = now.getTime() - then.getTime();
			if (goal_index >= 0 && goal_index <= 1) {
				ms = (now.getTime() - then.getTime())/4;
			} else if (goal_index >= 2 && goal_index <= 6) {
				//alert((now.getTime()-then.getTime()-goals[1]*2.5)/2);
				ms = goals[1]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4)/3.5;
			} else if (goal_index >= 7 && goal_index <= 11) {
				ms = goals[6]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5)/3;
			} else if (goal_index >= 12 && goal_index <= 16) {
				ms = goals[11]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3)/2.5;
			} else if (goal_index >= 17 && goal_index <= 21) {
				ms = goals[16]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5)/2;
			} else if (goal_index >= 22 && goal_index <= 26) {
				ms = goals[21]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5-(goals[21]-goals[16])*1000*2)/1.5;
			} else if (goal_index >= 27) {
				// 14是上一个else-if的条件上限，现在减去最初的时间差需要减去第一分段的2.5倍加上第二分段的2倍减去第三分段的1.5倍再除上本段的速度倍数即可
				ms = goals[26]*1000 + (now.getTime()-then.getTime()-goals[1]*1000*4-(goals[6]-goals[1])*1000*3.5-(goals[11]-goals[6])*1000*3-(goals[16]-goals[11])*1000*2.5-(goals[21]-goals[16])*1000*2-(goals[26]-goals[21])*1000*1.5)/1.02;
			}
			classic_mode_seconds.innerHTML = parseInt(ms/1000); //丢弃小数部分取整
			classic_mode_mSeconds.innerHTML = parseInt(ms/100) - 10 * parseInt(ms/1000);

			if((parseInt(ms/1000)+1-goals[goal_index])>1) {
				// 用户一直不点

				platform.style.display = 'none';
				if (parseInt(ms/100)/10 > storage.classic_score) {
					if (goals[goal_index-1] == storage.classic_score) {
						resultContent.innerHTML = "<p>没能创造新纪录1</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
						record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
						maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
						resultsOld.style.display = "block";
					} else if (goals[goal_index-1] > storage.classic_score) {
						// 排除在第一个时刻点之前产生的误判  条件：parseInt(ms/100)/10 > goals[0]
						storage.classic_score = goals[goal_index-1];
						$('body').append('<embed id="music" src="newRecord.mp3" autostart="true" hidden="true" loop="false">');
						resultContent.innerHTML = "<p>创造新纪录！</p>"+"<span>新的纪录：</span>"+storage.classic_score+"<span>秒</span>";
						record2.innerHTML = storage.classic_score;
						maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
						resultsNew.style.display = "block";
					} else {
						resultContent.innerHTML = "<p>没能创造新纪录1</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
						record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
						maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
						resultsOld.style.display = "block";
					}
				} else {
					// 没创造新纪录页面
					resultContent.innerHTML = "<p>没能创造新纪录TAT</p>"+"<span>最高纪录：</span>"+storage.classic_score+"<span>秒</span>";
					record3.innerHTML = (goals[goal_index-1]==undefined)?0:goals[goal_index-1];
					maxRecord1.innerHTML = maxRecord2.innerHTML = storage.classic_score;
					resultsOld.style.display = "block";
				}
			}
		}
	}

	setInterval(display,50);
	
	classic_mode_setButton.onclick = function() {
		if(go.style.display == "block") {
			// 第一次点击时GO动画 
			setTimeout(function(){
				go.style.backgroundColor = "transparent";
				$("#go").animate({fontSize:'160px', opacity: "0.5", marginTop: "-=10", marginLeft: "-=68"}, 250);
				setTimeout(function(){
					go.style.display = "none";
				}, 250);
			} ,500) 
		} else {
			go.style.display = "none";
		}
	 	
	 	startstop();
	}

	var toggle = 0;
	for (var i = 0; i < clickShare.length; i++) {
		clickShare[i].onclick = function() {
			if(toggle == 0) {
				icon_medium_plus[0].style.display = "block";
				icon_medium_plus[1].style.display = "block";
				toggle = 1;
			} else {
				icon_medium_plus[0].style.display = "none";
				icon_medium_plus[1].style.display = "none";
				toggle = 0;
			}
		}
	}


	startStopB.onclick = function() {
		innerStatStopBtn.style.display = "block";
		isZanTing = 1;
		hoverAll.style.display = "block";
		startStopB.style.display = "none";
		startstop();
	}
	stopDownBtn.onclick = stopContinue.onclick = function() {
		innerStatStopBtn.style.display = "none";
		isZanTing = 0;
		hoverAll.style.display = "none";
		startStopB.style.display = "block";
		state = 0;
		startstop();
	}
}
