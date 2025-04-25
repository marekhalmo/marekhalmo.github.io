function startWebClient(serverip, port) {
    console.log("Starting web client " + serverip + ":" + port);
	//enable("loader");
	runServer(serverip, port);
}
	
function runServer(serverip, port) {
    console.log("Starting web client " + serverip + ":" + port);
    const ws = new WebSocket('ws://' + serverip + ":" + port);
    ws.onmessage = (event) => {
		console.log("Received message: " + event.data);
        processMessage(event.data);
    };
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    ws.onopen = () => {
        console.log('WebSocket connection established');
    };
    ws.onclose = () => {
        console.log('WebSocket connection closed');
        setTimeout(startWebClient(serverip, port), 1000);
    };
}

function processMessage(e) {
    if (!e) {
        return;
    }

    const customData = JSON.parse(e);
    //debug("CustomData obj: " + JSON.stringify(customData));

    debug("...PARSED...");

    if (customData.debug) {
        document.getElementById('debug').classList.remove('hiddenMy');
    }

    if (!customData.target || customData.target == 'splash') {
        fadeToSplash();
        return;
    } else if (customData.target == 'black') {
        fadeToBlack();
        return;
    } else if (customData.target == 'background') {
        fadeToBackground();
        return;
    } else if (customData.target == 'song') {
        fadeToSong();
        // TODO: try animated verse swap: https://alvarotrigo.com/blog/css-text-animations/
        debug("a1");
        if (customData.style) {
            document.getElementById('song').innerHTML = customData.message;
        } else {
            document.getElementById('song').textContent = customData.message;
        }
        debug("a2");
        if (customData.source) {
            document.getElementById('song-source').textContent = customData.source;
        } else {
            document.getElementById('song-source').textContent = "";
        }
        debug("a3");
        if (customData.style) {
            setSongStyle(customData.style);
        }
        debug("a4");

        if (customData.size) {
            setSongSize(customData.size);
        }

    } else if (customData.target == 'verse') {
        fadeToVerse();
        // TODO: try animated verse swap: https://alvarotrigo.com/blog/css-text-animations/
        debug("b1");
        if (customData.style) {
            document.getElementById('verse').innerHTML = customData.message;
        } else {
            document.getElementById('verse').textContent = customData.message;
        }
        debug("b2");
        if (customData.source) {
            document.getElementById('source').textContent = customData.source;
        } else {
            document.getElementById('source').textContent = "";
        }
        debug("b3");
        if (customData.style) {
            setVerseStyle(customData.style);
        }
        debug("b4");

        if (customData.size) {
            setVerseSize(customData.size);
        }

    } else if (customData.target == "announcements" || customData.target == "giving" || customData.target == "summary") {
        if(customData.target != "giving") {
            fadeToAnnouncement();
        }

        debug("c1");
        if (customData.style) {
            setAnnouncementStyle(customData.style);
        }
        debug("c2");
        if (customData.style) {
            document.getElementById('announcement').innerHTML = customData.message;
        } else {
            document.getElementById('announcement').textContent = customData.message;
        }
        debug("c3");

        if (customData.size) {
            setAnnouncementSize(customData.size);
        }
		
		if (customData.source) {
            document.getElementById('announcement-footer-right').textContent = customData.source;
        } else {
            document.getElementById('announcement-footer-right').textContent = "";
        }
    } else if (customData.target == "timer") {
        fadeToTimer();
        debug("d1");
        if (customData.message) {
            document.getElementById('timerMessage').innerHTML = customData.message;
        } else {
            document.getElementById('timerMessage').textContent = customData.message;
        }
        debug("d2");

        startCountdown(customData.source);

        debug("d3");

        if (customData.size) {
            setTimerSize(customData.size);
        }
    } else if (customData.target == "image") {
        if(customData.message) {
            document.getElementById('image').src = customData.message;
        }
    }

    setDemo(customData.demo && customData.demo === "true");

    if (customData.background) {
        debug("x1");
        loadBackground(customData.background, customData.onblack);
    } else {
        debug("x2");
        clearBackground();
    }

    debug("Target: " + customData.target);
    debug("...DONE");
}
