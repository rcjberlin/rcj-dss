const LS_CURRENT_SCREEN = "currentScreen";
const LS_DATA           = "data";

const GAP          = "gap";
const OBSTACLE     = "obstacle";
const SPEEDBUMP    = "speedbump";
const RAMP         = "ramp";
const INTERSECTION = "intersection";

const LOG_SECTION_COMPLETE = "SECTION COMPLETE";
const LOG_LOP              = "LACK OF PROGRESS";
const LOG_SKIP_SECTION     = "SKIP SECTION";
const LOG_ADD_GAP          = "ADD GAP";
const LOG_ADD_OBSTACLE     = "ADD OBSTACLE";
const LOG_ADD_SPEEDBUMP    = "ADD SPEEDBUMP";
const LOG_ADD_RAMP         = "ADD RAMP";
const LOG_ADD_INTERSECTION = "ADD INTERSECTION";
const LOG_DEL_GAP          = "DEL GAP";
const LOG_DEL_OBSTACLE     = "DEL OBSTACLE";
const LOG_DEL_SPEEDBUMP    = "DEL SPEEDBUMP";
const LOG_DEL_RAMP         = "DEL RAMP";
const LOG_DEL_INTERSECTION = "DEL INTERSECTION";
const LOG_LAST_CHECKPOINT  = "LAST CHECKPOINT";

const pathImageTimeStart = "img/start.svg";
const pathImageTimePause = "img/pause.svg";

let data = {};
let competitions = {};

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
	if (data["currentRun"] === null) {
		return false;
	}
	return data["currentRun"]["time"]["timeStartedTimestamp"] !== null;
};

let startAutoUpdatingTime = function () {
	stopAutoUpdatingTime();
	intervalIdTime = setInterval(updateTime, 200);
};

let stopAutoUpdatingTime = function () {
	if (intervalIdTime !== null) {
		clearInterval(intervalIdTime);
		intervalIdTime = null;
	}
};

let setIconsForTimeRunning = function () {
	document.getElementById("s3-time-start-pause").src = pathImageTimePause;
	document.getElementById("s4-time-start-pause").src = pathImageTimePause;
	document.getElementById("s4-prev").classList.add("disabled");
	document.getElementById("s4-next").classList.add("disabled");
};

let setIconsForTimePaused = function () {
	document.getElementById("s3-time-start-pause").src = pathImageTimeStart;
	document.getElementById("s4-time-start-pause").src = pathImageTimeStart;
	document.getElementById("s4-prev").classList.remove("disabled");
	document.getElementById("s4-next").classList.remove("disabled");
};

let toggleTimeRunning = function () {
	if (!isTimeRunning()) { // time currently paused -> start time
		data["currentRun"]["time"]["timeStartedTimestamp"] = getTime();
		setIconsForTimeRunning();
		startAutoUpdatingTime();
	}
	else { // time currently running -> pause time
		data["currentRun"]["time"]["timeOffset"] = data["currentRun"]["time"]["timeOffset"]
													+ getTime()
													- data["currentRun"]["time"]["timeStartedTimestamp"];
		data["currentRun"]["time"]["timeStartedTimestamp"] = null;
		setIconsForTimePaused();
		stopAutoUpdatingTime();
		updateTime();
	}
	saveDataToLocalStorage();
};

let getRunTimeInSeconds = function () {
	if (data["currentRun"] === null) {
		return 0;
	}
	let time = data["currentRun"]["time"]["timeOffset"];
	if (data["currentRun"]["time"]["timeStartedTimestamp"] !== null) {
		time += getTime() - data["currentRun"]["time"]["timeStartedTimestamp"];
	}
	return time;
};

let updateTime = function () {
	let time = getRunTimeInSeconds();
	let minutes = Math.floor(time/60);
	let seconds = Math.floor(time%60);
	minutes = (minutes < 10 ? minutes : (minutes > 15 ? "X" : minutes.toString(16)));
	seconds = (seconds < 10 ? "0" : "") + seconds;
	document.getElementById("s3-time").innerHTML = minutes + ":" + seconds;
	document.getElementById("s4-time").innerHTML = minutes + ":" + seconds;
};

let resetTime = function () {
	stopAutoUpdatingTime()
	data["currentRun"]["time"]["timeOffset"] = 0.0;
	data["currentRun"]["time"]["timeStartedTimestamp"] = null;
	saveDataToLocalStorage();
	
	updateTime();
	document.getElementById("s3-time-start-pause").src = pathImageTimeStart;
	document.getElementById("s4-time-start-pause").src = pathImageTimeStart;
};

let btnResetTime = function () {
	// TODO: confirm() leads to a page-reload sometimes
	if (confirm("Are you sure to reset the time? You can't undo this step.")) {
		resetTime();
	}
};

let initializeTime = function () {
	if (data["currentRun"] !== null) {
		updateTime();
		if (isTimeRunning()) {
			startAutoUpdatingTime();
			setIconsForTimeRunning();
		} else {
			setIconsForTimePaused();
		}
	}
};


let addEventListenersForNavigationButtons = function () {
	document.getElementById("s1-next").addEventListener("click", function(e) {
		changeScreen(1, 2);
	});
	
	document.getElementById("s2-prev").addEventListener("click", function(e) {
		changeScreen(2,1);
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
	
	document.getElementById("s3-prev").addEventListener("click", function(e) {
		if (getRunTimeInSeconds() === 0) {
			changeScreen(3, 2);
		} else {
			alert("You can't go back if the time already started. If you need to change the setup you can do this just before submitting the run.");
		}
	});
	
	document.getElementById("s3-next").addEventListener("click", function(e) {
		changeScreen(3, 4);
	});
	
	document.getElementById("s4-prev").addEventListener("click", function(e) {
		if (!isTimeRunning()) {
			changeScreen(4, 3);
		}
	});
	
	document.getElementById("s4-next").addEventListener("click", function(e) {
		if (!isTimeRunning()) {
			changeScreen(4, 5);
		}
	});
	
	document.getElementById("s5-prev").addEventListener("click", function(e) {
		changeScreen(5, 4);
	});
	
	document.getElementById("s5-next").addEventListener("click", function(e) {
		changeScreen(5, 6);
	});
	
	document.getElementById("s6-prev").addEventListener("click", function(e) {
		changeScreen(6, 5);
	});
};

let btnS1ViewData = function () {
	changeScreen(1, 8);
};

let btnS6Submit = function () {
	changeScreen(6, 7);
};

let btnS7NewRun = function () {
	changeScreen(7, 2);
};

let btnS7ViewData = function () {
	changeScreen(7, 8);
};

let btnS8Setup = function () {
	changeScreen(8, 1);
};

let btnS8NewRun = function () {
	changeScreen(8, 2);
};

let addEventListenersForButtons = function () {
	document.getElementById("s3-time-start-pause").addEventListener("click", function(e) {
		toggleTimeRunning();
	});
	document.getElementById("s4-time-start-pause").addEventListener("click", function(e) {
		toggleTimeRunning();
	});
	document.getElementById("s4-btn-section-complete").addEventListener("click", function(e) {
		sectionComplete();
	});
	document.getElementById("s4-btn-section-lop").addEventListener("click", function(e) {
		sectionLoP();
	});
	document.getElementById("s4-btn-section-skip").addEventListener("click", function(e) {
		sectionSkip();
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
	
	document.getElementById("team-showed-up").addEventListener("change", onChangeInputTeamShowedUp);
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
	updateUIElementsForRun();
};

let onChangeInputTeamname = function () {
	createNewRun(document.getElementById("teamname").value,
				 document.getElementById("evacuation-point-high").checked ? "high" : "low");
};

let onChangeInputEvacuationPoint = function () {
	data["currentRun"]["evacuationPoint"] = document.getElementById("evacuation-point-high").checked ? "high" : "low";
	saveDataToLocalStorage();
};

let onChangeInputTeamShowedUp = function () {
	data["currentRun"]["teamStarted"] = document.getElementById("team-showed-up").checked;
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
		teamStarted: true,
		sections: [
			getNewSection(1),
		],
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

let getNewSection = function (sectionId) {
	return {
		sectionId: sectionId,
		completedSection: false,
		skippedSection: false,
		lops: 0,
		isAfterLastCheckpoint: false,
		gaps: 0,
		obstacles: 0,
		speedbumps: 0,
		ramps: 0,
		intersections: 0,
		tiles: 0,
	};
};

let createNewSection = function () {
	data["currentRun"]["sections"].push(getNewSection(getNumberOfSections() + 1));
};

let updateUIElementsForRun = function () {
	document.getElementById("teamname").value = data["currentRun"]["teamname"];
	
	if (data["currentRun"]["evacuationPoint"] === "high") {
		document.getElementById("evacuation-point-high").checked = true;
	} else {
		document.getElementById("evacuation-point-low").checked = true;
	}
	
	document.getElementById("team-showed-up").checked = data["currentRun"]["teamStarted"];
	
	updateTime();
	
	updateUIElementsS4();
};

let updateUIElementsS4 = function () {
	updateUISectionAndTry();
	setCaptionsForAllScoringElements();
	updateSkipButton();
};

let updateUISectionAndTry = function () {
	let currentSection = getCurrentSection();
	document.getElementById("s4-section").innerHTML = currentSection.sectionId;
	document.getElementById("s4-try").innerHTML = currentSection.lops + 1;
};

let getCurrentSection = function () {
	return data["currentRun"]["sections"][getNumberOfSections() - 1];
};

let getNumberOfSections = function () {
	return data["currentRun"]["sections"].length;
};

let setCaptionsForAllScoringElements = function () {
	let arr = [GAP, OBSTACLE, SPEEDBUMP, RAMP, INTERSECTION];
	for (let i=0; i<arr.length; i++) {
		setCaptionForScoringElement(arr[i]);
	}
};

// TODO: get names/ids from array for cleaner code
let setCaptionForScoringElement = function (name) {
	let uiElement = document.getElementById("txt-"+name);
	let txt = "";
	let sections = data["currentRun"]["sections"];
	for (let i=0; i<sections.length; i++) {
		txt += " | " + sections[i][name+"s"];
	}
	
	txt = txt.substring(3);
	
	// fit to width of UI-Element (replace first numbers with "...")
	uiElement.innerHTML = txt;
	while (uiElement.clientHeight > uiElement.parentElement.clientHeight && txt !== "...") {
		if (txt.startsWith("...") === false) { txt = "..." + txt; }
		txt = "..." + txt.substring(4);
		uiElement.innerHTML = txt;
	}
};

let updateSkipButton = function () {
	if (isAllowedToSkip()) {
		document.getElementById("s4-btn-section-skip").style.background = "#fff";
		document.getElementById("s4-btn-section-skip").children[0].classList.remove("disabled");
	} else {
		document.getElementById("s4-btn-section-skip").style.background = "#f8f8f8";
		document.getElementById("s4-btn-section-skip").children[0].classList.add("disabled");
	}
};

let isAllowedToSkip = function () {
	return (getCurrentSection().lops >= 2);
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
	/* shows last opened screen, otherwise first screen */
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
	
	// no run exists but a screen which requires a run should be opened -> show first screen
	if ([3, 4, 5, 6, 7].includes(+currentScreen) && data["currentRun"] === null) {
		currentScreen = 1;
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

let addScoringElement = function (name) {
	// append to list of transactions
	// add specified scoring element in current section
	// save run to LocalStorage
	// update UI
	
	let elem = document.getElementById("border-img-"+name);
	elem.style.background = "#0f0";
	setTimeout(function () { elem.style.background = "black"; }, 150);
};

let removeScoringElement = function (name) {
	// ... (see above)
	
	let elem = document.getElementById("border-img-"+name);
	elem.style.background = "#f00";
	setTimeout(function () { elem.style.background = "black"; }, 150);
};

let sectionComplete = function () {
	getCurrentSection().completedSection = true;
	createNewSection();
	writeLog(LOG_SECTION_COMPLETE);
	
	saveDataToLocalStorage();
	updateUIElementsS4();
};

let undoSectionComplete = function () {
	// TODO
};

let sectionLoP = function () {
	getCurrentSection().lops += 1;
	writeLog(LOG_LOP);
	
	saveDataToLocalStorage();
	updateUIElementsS4();
};

let undoSectionLoP = function () {
	// TODO
};

let sectionSkip = function () {
	if (!isAllowedToSkip()) {
		showNotification("Skipping is only allowed after 3 attempts", 1500);
		return;
	}
	getCurrentSection().lops += 1;
	getCurrentSection().skippedSection = true;
	createNewSection();
	writeLog(LOG_SKIP_SECTION);
	
	saveDataToLocalStorage();
	updateUIElementsS4();
};

let undoSectionSkip = function () {
	// TODO
};

let showWarningIfTimeIsNotRunning = function () {
	if (!isTimeRunning()) {
		showNotification("WARNING: Time is not running!", 3000);
	}
};

let showNotification = function (notification, maxDuration) {
	document.getElementById("txt-notification").innerHTML = notification;
	if (maxDuration !== undefined) {
		setTimeout(function () {
			if (document.getElementById("txt-notification").innerHTML === notification) {
				document.getElementById("txt-notification").innerHTML = "";
			}
		}, maxDuration);
	}
};

let writeLog = function (log) {
	showWarningIfTimeIsNotRunning();
	data["currentRun"]["logs"].push({
		time: getRunTimeInSeconds(),
		log: log,
		undone: false,
	});
};

let initializeInputs = function () {
	document.getElementById("referee-name").value = data["referee"]["name"];
	document.getElementById("referee-password").value = data["referee"]["password"];
	document.getElementById("competition").value = data["competition"];
	
	let arena = data["arena"]; // data["arena"] will be overwritten by initializing competition-input with onChangeInputCompetition()
	let round = data["round"]; // ... same here ...
	let run = null; // ... same here ...
	if (data["currentRun"] !== null) {
		run = data["currentRun"];
	}
	
	onChangeInputCompetition();
	
	changeLocalData("arena", arena);
	changeLocalData("round", round);
	
	document.getElementById("arena").value = data["arena"];
	document.getElementById("round").value = data["round"];
	
	if (run !== null) {
		if (competitions[data["competition"]]["teams"].includes(run["teamname"])) {
			data["currentRun"] = run;
			
			updateUIElementsForRun();
			initializeTime();
		}
	}
	
	saveDataToLocalStorage();
}