var displayTime = document.getElementById('display-time'),
displayMilliSeconds = document.getElementById('display-milliseconds'),
btnGroup = document.getElementById('btn-group');

var btnStart = document.getElementById('btn-start');
btnStart.addEventListener('click', startTimer);

var btnClear = document.getElementById('btn-clear');
btnClear.addEventListener('click', clearTimer);

var origin = new Date(0, 0),
hours = 0,
minutes = 0,
seconds = 0,
counter,
currentTime;

function time () {
	origin.setMilliseconds( origin.getMilliseconds() + 4);
	var milliseconds = origin.getMilliseconds();

	if (milliseconds === 996) {
		++seconds;
	}
	if (seconds >= 60) {
		seconds = 0;
		++minutes;
	} 
	if (minutes >= 60) {
		minutes = 0;
		++hours;
	} 
	if (seconds < 10) {
		secondsNum = '0' + seconds;
	} else {
		secondsNum = seconds;
	}
	if (minutes < 10) {
		minutesNum = '0' + minutes;
	} else {
		minutesNum = minutes;
	}
	if (hours < 10) {
		hoursNum = '0' + hours;
	} else {
		hoursNum = hours;
	}

	currentTime = hoursNum + ':' + minutesNum + ':' + secondsNum;
	displayTime.innerHTML = currentTime;
	displayMilliSeconds.innerHTML = milliseconds;

	return currentTime;
}

function startTimer() {
	btnStart.classList.add('btn-primary');
	btnStart.classList.remove('btn-success');
	btnStart.innerHTML = 'Pause';
	btnGroup.style.width = '340px';
	counter = setInterval(time, 4);
	btnStart.removeEventListener('click', startTimer);
	btnStart.addEventListener('click', pauseTimer);
}

function pauseTimer() {
	btnStart.classList.add('btn-success');
	btnStart.classList.remove('btn-primary');
	btnStart.innerHTML = 'Continue';
	btnGroup.style.width = '410px';
	clearInterval(counter);
	displayTime.innerHTML = currentTime;
	btnStart.removeEventListener("click", pauseTimer);
	btnStart.addEventListener("click", startTimer);
}

function clearTimer(){
	btnStart.classList.remove('btn-primary');
	btnStart.classList.add('btn-success');
	btnStart.innerHTML = 'Start';
	btnGroup.style.width = '306px';
	displayTime.innerHTML = '00:00:00';
	displayMilliSeconds.innerHTML = '000';
	clearInterval(counter);
	btnStart.removeEventListener("click", pauseTimer);
	btnStart.addEventListener("click", startTimer);
	origin = new Date(0, 0);
	seconds = 0;
	minutes = 0;
	hours = 0;
}