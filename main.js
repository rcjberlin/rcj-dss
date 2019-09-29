const LS_CURRENT_SCREEN = "currentScreen";
const LS_DATA           = "data";

const GAP          = "gap";
const OBSTACLE     = "obstacle";
const SPEEDBUMP    = "speedbump";
const RAMP         = "ramp";
const INTERSECTION = "intersection";

let data = {};
let competitions = {};

let timeOffset = 0.0;
let timeStartedTimestamp = null;
let intervalIdTime = null;

let url = new URL(window.location.href);

let getTime = function () {
	return (new Date).getTime() / 1000;
};

window.onload = function() {
	loadCompetitionInfo();
	loadDataFromLocalStorage();
	initializeMissingData();
	
	adjustSizeOfMainUI();
	
	addEventListenersForNavigationButtons();
	addEventListenersForButtons();
	addEventListenersForInputs();
	addEventListenersForScoringElementButtons();
	
	showInitialScreen();
};

let isTimeRunning = function () {
	return timeStartedTimestamp !== null;
};

let toggleTimeRunning = function () {
	if (!isTimeRunning()) { // time currently paused
		timeStartedTimestamp = getTime();
		document.getElementById("s3-time-start-pause").src = "img/pause.svg";
		document.getElementById("s4-time-start-pause").src = "img/pause.svg";
		intervalIdTime = setInterval(updateTime, 200);
	}
	else { // time currently running
		timeOffset = timeOffset + getTime() - timeStartedTimestamp;
		timeStartedTimestamp = null;
		document.getElementById("s3-time-start-pause").src = "img/start.svg";
		document.getElementById("s4-time-start-pause").src = "img/start.svg";
		clearInterval(intervalIdTime);
		intervalIdTime = null;
		updateTime();
	}
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
	document.getElementById("s3-time").innerHTML = minutes + ":" + seconds;
	document.getElementById("s4-time").innerHTML = minutes + ":" + seconds;
};

let resetTime = function () {
	if (intervalIdTime !== null) {
		clearInterval(intervalIdTime);
	}
	timeOffset = 0.0;
	timeStartedTimestamp = null;
	intervalIdTime = null;
	updateTime();
	document.getElementById("s3-time-start-pause").src = "img/start.svg";
	document.getElementById("s4-time-start-pause").src = "img/start.svg";
};

let btnResetTime = function () {
	// TODO: confirm() leads to a page-reload sometimes
	if (confirm("Are you sure to reset the time? You can't undo this step.")) {
		resetTime();
	}
};


let addEventListenersForNavigationButtons = function () {
	document.getElementById("s1-next").addEventListener("click", function(e) {
		changeScreen(1, 2);
	});
	
	document.getElementById("s2-next").addEventListener("click", function(e) {
		if (data["currentRun"] !== null &&
			data["currentRun"]["referee"]["name"] !== "" &&
			["line","entry"].includes(data["currentRun"]["competition"]) &&
			competitions[data["currentRun"]["competition"]]["arenas"].includes(data["currentRun"]["arena"]) &&
			competitions[data["currentRun"]["competition"]]["rounds"].includes(data["currentRun"]["round"]) &&
			competitions[data["currentRun"]["competition"]]["teams"].includes(data["currentRun"]["teamname"]) &&
			( data["currentRun"]["evacuationPoint"] === "low" ||
			 (data["currentRun"]["evacuationPoint"] === "high" && data["currentRun"]["competition"] === "line"))) {
			changeScreen(2, 3);
		}
	});
	
	document.getElementById("s4-prev").addEventListener("click", function(e) {
		changeScreen(4, 3);
	});
	
	document.getElementById("s4-next").addEventListener("click", function(e) {
		changeScreen(4, 5);
	});
};

let addEventListenersForButtons = function () {
	document.getElementById("s3-time-start-pause").addEventListener("click", function(e) {
		toggleTimeRunning();
	});
	document.getElementById("s4-time-start-pause").addEventListener("click", function(e) {
		toggleTimeRunning();
	});
};

let addEventListenersForInputs = function () {
	document.getElementById("referee-name").addEventListener("change", onChangeInputRefereeName);
	document.getElementById("referee-password").addEventListener("change", onChangeInputRefereePassword);
	document.getElementById("competition").addEventListener("change", onChangeInputCompetition);
	document.getElementById("arena").addEventListener("change", onChangeInputArena);
	document.getElementById("round").addEventListener("change", onChangeInputRound);
	
	document.getElementById("teamname").addEventListener("change", onChangeInputTeamname);
	document.getElementById("evacuation-point-low").addEventListener("change", onChangeInputEvacuationPoint);
	document.getElementById("evacuation-point-high").addEventListener("change", onChangeInputEvacuationPoint);
};

let changeLocalData = function (name, value) {
	if (name.startsWith("referee-")) {
		name = name.substring(8);
		data["referee"][name] = value;
		if (data["currentRun"] !== null) {
			data["currentRun"]["referee"][name] = value;
		}
	} else {
		data[name] = value;
		if (data["currentRun"] !== null) {
			data["currentRun"][name] = value;
		}
	}
	saveDataToLocalStorage();
};

let onChangeInputRefereeName = function () {
	changeLocalData("referee-name", document.getElementById("referee-name").value);
};

let onChangeInputRefereePassword = function () {
	changeLocalData("referee-password", document.getElementById("referee-password").value);
};

let getCompetitionInfo = function () {
	
};

let onChangeInputCompetition = function () {
	let selectedCompetition = document.getElementById("competition").value;
	if (selectedCompetition !== "line" && selectedCompetition !== "entry") {
		selectedCompetition = "line";
		document.getElementById("competition").value = selectedCompetition;
	}
	
	let competitionInfo = competitions[selectedCompetition];
	if (competitionInfo === undefined) {
		competitionInfo = { arenas: [], rounds: [], teams: [] };
	}
	
	setSelectInputOptions("arena", competitionInfo["arenas"]);
	setSelectInputOptions("round", competitionInfo["rounds"]);
	setSelectInputOptions("teamname", competitionInfo["teams"]);
	
	// teamname
	data["currentRun"] = null;
	
	// evacuation point
	document.getElementById("evacuation-point-low").checked = true;
	if (selectedCompetition === "entry") {
		document.getElementById("evacuation-point-low").disabled = true;
		document.getElementById("evacuation-point-high").disabled = true;
	} else {
		document.getElementById("evacuation-point-low").disabled = false;
		document.getElementById("evacuation-point-high").disabled = false;
	}
	
	// save to data / Local Storage
	changeLocalData("competition", selectedCompetition);
	changeLocalData("arena", document.getElementById("arena").value);
	changeLocalData("round", document.getElementById("round").value);
};

let onChangeInputArena = function () {
	changeLocalData("arena", document.getElementById("arena").value);
};

let onChangeInputRound = function () {
	changeLocalData("round", document.getElementById("round").value);
};

let setSelectInputOptions = function (selectId, options) {
	let selectInput = document.getElementById(selectId);
	
	// remove all options
	selectInput.options.length = 0;
	
	// add option for all elements in passed array
	options.sort();
	for (let i=0; i < options.length; i++) {
		selectInput.options[selectInput.options.length] = new Option(options[i], options[i], false, false);
	}
	
	selectInput.value = "";
};

let createNewRun = function (teamname, evacuationPoint) {
	data["currentRun"] = getNewRun();
	data["currentRun"]["teamname"] = teamname;
	data["currentRun"]["evacuationPoint"] = evacuationPoint;
	
	saveDataToLocalStorage();
};

let onChangeInputTeamname = function () {
	createNewRun(document.getElementById("teamname").value,
				 document.getElementById("evacuation-point-high").checked ? "high" : "low");
};

let onChangeInputEvacuationPoint = function () {
	data["currentRun"]["evacuationPoint"] = document.getElementById("evacuation-point-high").checked ? "high" : "low";
	saveDataToLocalStorage();
};

let getNewRun = function () {
	return {
		referee: {
			name: data["referee"]["name"],
			auth: data["referee"]["password"],
		},
		competition: data["competition"],
		arena: data["arena"],
		round: data["round"],
		teamname: "",
		evacuationPoint: "",
		time: {
			timeOffset: 0.0,
			timeStartedTimestamp: null,
		},
		sections: [],
		victims: {
			deadVictimsBeforeAllLivingVictims: 0,
			livingVictims: 0,
			deadVictimsAfterAllLivingVictims: 0,
		},
		leftEvacuationZone: false,
		comments: "",
		complaints: "",
		logs: [],
	};
};

let getNewSection = function () {
	return {};
};

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

let loadCompetitionInfo = async function () {
	const response = await fetch("./competitions.json");
	competitions = await response.json();
	
	initializeInputs();
};

let loadDataFromLocalStorage = function () {
	data = localStorage.getItem(LS_DATA);
	if (data === null) {
		data = {};
	} else {
		data = JSON.parse(data);
	}
};

let saveDataToLocalStorage = function () {
	localStorage.setItem(LS_DATA, JSON.stringify(data));
};

let initializeMissingData = function () {
	let arr = [ { name: "referee", initialValue: { name: "", password: "" } },
				{ name: "competition", initialValue: "line" },
				{ name: "arena", initialValue: "" },
				{ name: "round", initialValue: "" },
				{ name: "currentRun", initialValue: null }];
	
	for (let i=0; i<arr.length; i++) {
		if (data[arr[i].name] === undefined) {
			data[arr[i].name] = arr[i].initialValue;
		}
	}
	
	saveDataToLocalStorage();
};

let showInitialScreen = function () {
	/* shows last screen, otherwise first screen */
	let currentScreen = localStorage.getItem(LS_CURRENT_SCREEN);
	if (currentScreen === null) {
		currentScreen = 1;
		localStorage.setItem(LS_CURRENT_SCREEN, currentScreen);
	}
	
	let forceScreen = url.searchParams.get("fs");
	if(forceScreen) {
		currentScreen = forceScreen;
		localStorage.setItem(LS_CURRENT_SCREEN, currentScreen);
	}
	
	showScreen(currentScreen);
};

let showScreen = function (screenNumber) {
	let initFunction = [null, null, initScreen2, initScreen3, null, null, null, null, null][screenNumber];
	if (initFunction !== null) { initFunction(); }
	document.getElementById("screen-" + screenNumber).style.display = "";
};

let hideScreen = function (screenNumber) {
	document.getElementById("screen-" + screenNumber).style.display = "none";
};

let changeScreen = function (screenNumberFrom, screenNumberTo) {
	hideScreen(screenNumberFrom);
	showScreen(screenNumberTo);
	localStorage.setItem(LS_CURRENT_SCREEN, screenNumberTo);
	
	window.location.hash = "#" + screenNumberTo; // "disables" go-back-button of browser
};

let initScreen2 = function () {
	let txt;
	
	// name of referee
	txt = data["referee"]["name"];
	document.getElementById("s2-txt-referee-name").innerHTML = txt;
	
	// competition
	txt = "error";
	if (data["competition"] == "line") {
		txt = "Rescue Line";
	} else if (data["competition"] == "entry") {
		txt = "Rescue Line Entry";
	}
	document.getElementById("s2-txt-competition").innerHTML = txt;
	
	// arena
	if (data["arena"].startsWith("Arena ")) {
		txt = data["arena"].substring(6);
	} else {
		txt = data["arena"];
	}
	document.getElementById("s2-txt-arena").innerHTML = txt;
	
	// round
	if (data["round"].startsWith("Round ")) {
		txt = data["round"].substring(6);
	} else {
		txt = data["round"];
	}
	document.getElementById("s2-txt-round").innerHTML = txt;
};

let initScreen3 = function () {
	let txt;
	
	// teamname
	txt = data["currentRun"]["teamname"];
	document.getElementById("s3-txt-teamname").innerHTML = txt;
	
	// evacuation point
	txt = data["currentRun"]["evacuationPoint"];
	document.getElementById("s3-txt-evacuation-point").innerHTML = txt;
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

let initializeInputs = function () {
	document.getElementById("referee-name").value = data["referee"]["name"];
	document.getElementById("referee-password").value = data["referee"]["password"];
	document.getElementById("competition").value = data["competition"];
	
	let arena = data["arena"]; // data["arena"] will be overwritten by initializing competition-input with onChangeInputCompetition()
	let round = data["round"]; // ... same here ...
	let teamname, evacuationPoint; // ... same here ...
	if (data["currentRun"] !== null) {
		teamname = data["currentRun"]["teamname"];
		evacuationPoint = data["currentRun"]["evacuationPoint"];
	}
	
	onChangeInputCompetition();
	
	changeLocalData("arena", arena);
	changeLocalData("round", round);
	
	document.getElementById("arena").value = data["arena"];
	document.getElementById("round").value = data["round"];
	
	if (teamname !== undefined) {
		if (competitions[data["competition"]]["teams"].includes(teamname)) {
			createNewRun(teamname, evacuationPoint);
			
			document.getElementById("teamname").value = data["currentRun"]["teamname"];
			if (data["currentRun"]["evacuationPoint"] === "high") {
				document.getElementById("evacuation-point-high").checked = true;
			} else {
				document.getElementById("evacuation-point-low").checked = true;
			}
		}
	}
	
	saveDataToLocalStorage();
}