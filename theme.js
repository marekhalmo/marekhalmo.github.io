var loadedBackground = "black";
var versesOnBlack = null;
var onBlack;

document.getElementById('background').onload = function(){
	if(versesOnBlack) {
		disableBackground();
	} else {
		enableBackground();
	}
};

function disableBackground() {
	backgroundDisabled = true;
	enable("blackground");
	addClassByQuerySelector('#verses', 'blackground');	
}

function enableBackground() {
	backgroundDisabled = false;
	disable("blackground");
	removeClassByQuerySelector('#verses', 'blackground');
}

function loadBackground(backgroundName, onBlack) {	
	debug("onBlack changed to " + onBlack);
	
	// onBlack can be null (no change)
	if(onBlack != null) {
		var boolOnBlack = onBlack === "true";
		if(versesOnBlack != boolOnBlack) {
			versesOnBlack = boolOnBlack;
		}
	}
	
	if(loadedBackground !== backgroundName) {
		loadedBackground = backgroundName;
		disableBackground();
		
		if(backgroundName.startsWith('http')) {
			document.getElementById('background').src = backgroundName;
		} else {
			document.getElementById('background').src = base + 'backgrounds/' + backgroundName + '.html';
			document.getElementById('templateStyle').href =  base + 'backgrounds/' + backgroundName + '.css';
		}
	}
}

function clearBackground() {
	enable("blackground");
	setTimeout(loadBackground, 1000, "black");
}

