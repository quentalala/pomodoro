//SELECTORS
const powerButton = document.querySelector('#theSwitch');
const displayTime = document.querySelector('#timeLeft');

const progress = document.querySelector('.progress');

const pomodoro = document.querySelector('#pomodoro');
const short_break = document.querySelector('#breather');
const long_break = document.querySelector('#break');


//EVENT LISTENERS
powerButton.addEventListener('click', whatYouSee);

pomodoro.addEventListener('click', productivity);
short_break.addEventListener('click', breather);
long_break.addEventListener('click', break_time);


//FUNCTIONS
let delayInMilliseconds = 1000; // 1 second

let timeLeft = parseInt(displayTime.innerHTML); // Only looks at minute
let timeInSeconds = timeLeft * 60;
let initialTime = timeLeft * 60;
let progressUpdate = null;

function changeTime(setNewTime) {
    displayTime.innerHTML = setNewTime;

    timeLeft = parseInt(displayTime.innerHTML);
    initialTime = timeLeft * 60;
    timeInSeconds = timeLeft * 60;

    progressUpdate = 0;
    progress.style.width= progressUpdate + '%';
}
        
function buttonPressed() {
    if (timeInSeconds !== 0) {
        timeInSeconds--; // Driver
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
    displayTime.innerHTML = (`${minutes}:${seconds}`)
    progressUpdate = (initialTime - timeInSeconds)/initialTime * 100;
    progress.style.width= progressUpdate + '%';
    } else if (timeInSeconds == 0) {
        changeTime('25:00');
        pause();
        productivity();
    }
}

function whatYouSee() { 
    if (powerButton.innerHTML === 'Start') {
        resume();
        countingDown = setInterval(buttonPressed, delayInMilliseconds);
    } else {
        pause();
    }
}

function resume() {
    powerButton.innerHTML = 'Stop';
}

function pause() {
    powerButton.innerHTML = 'Start';
    clearInterval(countingDown);
}

function productivity() {
    document.getElementById('colour_theme').setAttribute('href', 'default.css');
    document.getElementById('pomodoro').style.backgroundColor='#2b2b2b';
    document.getElementById('breather').style.backgroundColor='#474747';
    document.getElementById('break').style.backgroundColor='#474747';
}

function breather() {
    document.getElementById('colour_theme').setAttribute('href', "short_break.css");
    document.getElementById('pomodoro').style.backgroundColor='#7a7568';
    document.getElementById('breather').style.backgroundColor='#c7bea9';
    document.getElementById('break').style.backgroundColor='#7a7568';
}

function break_time() {
    document.getElementById('colour_theme').setAttribute('href', "long_break.css");
    document.getElementById('pomodoro').style.backgroundColor='#737778';
    document.getElementById('breather').style.backgroundColor='#737778';
    document.getElementById('break').style.backgroundColor='#BCC3C4';
}
