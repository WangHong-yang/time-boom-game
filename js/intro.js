window.onload = function () {
	var music = document.getElementById("music");
	var sound = document.getElementById("sound");
	var storage = window.localStorage; // 缓存, storage.classic_score = X.X秒

	var taggle = 0;
	var taggle_b = 0;

	if (storage.isMusic == undefined) {
		storage.isMusic = 1;
	}
	if (storage.isSound == undefined) {
		storage.isSound = 1;
	}

	// 音乐
	$('body').append('<embed src="animation.mp3" autostart="true" hidden="true" loop="false">');
	storage.isSound = 1;
	// $('embed').remove();
	 $('body').append('<embed src="bgsound.mp3" autostart="true" hidden="true" loop="true">');
	 storage.isSound = 1;

	music.onclick = function() {
		if (taggle == 0) {
			// 关闭音乐
			this.style.backgroundImage = "url(./imgs/noMusic.png)";
			taggle = 1;
			storage.isMusic = 0;
			$('embed').remove();
		} else {
			// 开启音乐
			this.style.backgroundImage = "url(./imgs/music.png)";
			taggle = 0;
			storage.isMusic = 1;
			$('embed').remove();
	        $('body').append('<embed src="bgsound.mp3" autostart="true" hidden="true" loop="true">');
		}
	}

	// 仅仅控制hover样式
	music.onmouseover = function () {
		if (taggle == 1) {
			this.style.backgroundImage = "url(./imgs/noMusicDown.png)";
		} else {
			this.style.backgroundImage = "url(./imgs/musicDown.png)";
		}
	}
	music.onmouseout = function () {
		if (taggle == 1) {
			this.style.backgroundImage = "url(./imgs/noMusic.png)";
		} else {
			this.style.backgroundImage = "url(./imgs/music.png)";
		}
	}



	sound.onclick = function() {
		if (taggle_b == 0) {
			// 关闭声音
			this.style.backgroundImage = "url(./imgs/peace.png)";
			taggle_b = 1;
			storage.isSound = 0;
		} else {
			// 开启声音
			this.style.backgroundImage = "url(./imgs/sound.png)";
			taggle_b = 0;
			storage.isSound = 1;
		}
	}

	// 仅仅控制hover样式
	sound.onmouseover = function () {
		if (taggle_b == 1) {
			this.style.backgroundImage = "url(./imgs/peaceDown.png)";
		} else {
			this.style.backgroundImage = "url(./imgs/soundDown.png)";
		}
	}
	sound.onmouseout = function () {
		if (taggle_b == 1) {
			this.style.backgroundImage = "url(./imgs/peace.png)";
		} else {
			this.style.backgroundImage = "url(./imgs/sound.png)";
		}
	}

}