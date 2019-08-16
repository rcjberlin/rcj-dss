const LS_CURRENT_SCREEN = "currentScreen";

const GAP          = "gap";
const OBSTACLE     = "obstacle";
const SPEEDBUMP    = "speedbump";
const RAMP         = "ramp";
const INTERSECTION = "intersection";

let timeOffset = 0.0;
let timeStartedTimestamp = null;
let intervalIdTime = null;

let getTime = function () {
	return (new Date).getTime() / 1000;
}

window.onload = function() {
	addEventListenersForScoringElementButtons();
	adjustSizeOfMainUI();
	
	showInitialScreen();
	
	document.getElementById("img-time-start-pause").addEventListener("click", function(e) {
		if (timeStartedTimestamp === null) { // time currently paused
			timeStartedTimestamp = getTime();
			document.getElementById("img-time-start-pause").src = "img/pause.svg";
			intervalIdTime = setInterval(updateTime, 200);
		}
		else { // time currently running
			timeOffset = timeOffset + getTime() - timeStartedTimestamp;
			timeStartedTimestamp = null;
			document.getElementById("img-time-start-pause").src = "img/start.svg";
			clearInterval(intervalIdTime);
			intervalIdTime = null;
			updateTime();
		}
	});
};

let updateTime = function () {
	let time = timeOffset;
	if (timeStartedTimestamp !== null) {
		time += getTime() - timeStartedTimestamp;
	}
	let minutes = Math.floor(time/60);
	let seconds = Math.floor(time%60);
	minutes = (minutes < 10 ? minutes : (minutes > 15 ? "X" : minutes.toString(16)));
	seconds = (seconds < 10 ? "0" : "") + seconds;
	document.getElementById("s4-time").innerHTML = minutes + ":" + seconds;
}

let addEventListenersForScoringElementButtons = function () {
	let arr = [ {imgId: "img-gap",          name: GAP},
				{imgId: "img-obstacle",     name: OBSTACLE},
				{imgId: "img-speedbump",    name: SPEEDBUMP},
				{imgId: "img-ramp",         name: RAMP},
				{imgId: "img-intersection", name: INTERSECTION}];
	for(let i=0; i<arr.length; i++) {
		document.getElementById(arr[i].imgId).addEventListener("click", function(e) {
			addScoringElement(arr[i].name);
		});
		document.getElementById(arr[i].imgId).addEventListener("contextmenu", function(e) {
			removeScoringElement(arr[i].name);
			e.preventDefault();
		});
	}
};

let adjustSizeOfMainUI = function () {
	/* media-query for aspect-ratio isn't working as wanted in Chrome/Android (problem with disappearing url-bar) */
	let possibleWidth = window.innerWidth;
	let possibleHeight = window.innerHeight; //document.body.clientHeight can be used alternatively (-> possible to hide url-bar)
	if (possibleHeight * 2 / 3 < possibleWidth) {
		document.getElementById("screen-4").style.height = possibleHeight + "px";
		document.getElementById("screen-4").style.width = possibleHeight * 2 / 3 + "px";
	} else {
		document.getElementById("screen-4").style.height = possibleWidth * 3 / 2 + "px";
		document.getElementById("screen-4").style.marginBottom = possibleHeight - possibleWidth * 3 / 2 + "px";
		document.getElementById("screen-4").style.width = possibleWidth + "px";
	}
};

let showInitialScreen = function () {
	/* shows last screen, otherwise first screen */
	let currentScreen = localStorage.getItem(LS_CURRENT_SCREEN);
	if (currentScreen === null) {
		currentScreen = 1;
		localStorage.setItem(LS_CURRENT_SCREEN, currentScreen);
	}
	showScreen(currentScreen);
};

let showScreen = function (screenNumber) {
	document.getElementById("screen-" + screenNumber).style.display = "";
};

let hideScreen = function (screenNumber) {
	document.getElementById("screen-" + screenNumber).style.display = "none";
};

let changeScreen = function (screenNumberFrom, screenNumberTo) {
	hideScreen(screenNumberFrom);
	showScreen(screenNumberTo);
	localStorage.setItem(LS_CURRENT_SCREEN, screenNumberTo);
};

function btnclicked () {
	changeScreen(1, 4);
};

let addScoringElement = function (type) {
	// append to list of transactions
	// add specified scoring element in current section
	// save run to LocalStorage
	// update UI
	
	let elem = document.getElementById("border-img-"+type);
	elem.style.background = "#0f0";
	setTimeout(function () { elem.style.background = "black"; }, 150);
};

let removeScoringElement = function (type) {
	// ... (see above)
	
	let elem = document.getElementById("border-img-"+type);
	elem.style.background = "#f00";
	setTimeout(function () { elem.style.background = "black"; }, 150);
};