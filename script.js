//SELECTORS
const POWER_BUTTON = document.querySelector('#theSwitch');
const TIME_DISPLAYED = document.querySelector('#timeLeft');

const PROGRESS = document.querySelector('.progress');

const POMODORO_BUTTON = document.querySelector('#pomodoro');
const SHORT_BREAK_BUTTON = document.querySelector('#breather');
const LONG_BREAK_BUTTON = document.querySelector('#break');


//EVENT LISTENERS
POWER_BUTTON.addEventListener('click', whatYouSee);

POMODORO_BUTTON.addEventListener('click', productivity);
SHORT_BREAK_BUTTON.addEventListener('click', breather);
LONG_BREAK_BUTTON.addEventListener('click', break_time);


//FUNCTIONS
let delayInMilliseconds = 1000; // 1 second

let time_left = parseInt(TIME_DISPLAYED.innerHTML); // Only looks at minute
let time_in_seconds = time_left * 60;
let initial_time = time_left * 60;
let progress_update = null;

function changeTime(setNewTime) {
    TIME_DISPLAYED.innerHTML = setNewTime;
    document.title = TIME_DISPLAYED.innerHTML; //Slight delay; tab title displays timer
    pause(); 
    //Without this, if you clicked one of the buttons to change the initial timer
    //The timer would automatically continue counting down 

    time_left = parseInt(TIME_DISPLAYED.innerHTML);
    initial_time = time_left * 60;
    time_in_seconds = time_left * 60;

    progress_update = 0;
    PROGRESS.style.width= progress_update + '%';
}
        
function buttonPressed() {
    if (time_in_seconds !== 0) {
        time_in_seconds--; // Driver
        let minutes = Math.floor(time_in_seconds / 60);
        let seconds = time_in_seconds % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
    TIME_DISPLAYED.innerHTML = (`${minutes}:${seconds}`)
    document.title = TIME_DISPLAYED.innerHTML; //Slight delay; tab title displays timer
    progress_update = (initial_time - time_in_seconds)/initial_time * 100;
    PROGRESS.style.width = progress_update + '%'; //Progress bar elongates
    } else if (time_in_seconds == 0) {
        document.title = 'nice!';
        alert("Timer is done!");
        changeTime('25:00');
        document.title = '25:00';
        pause();
        productivity();
    }
}

function whatYouSee() { 
    if (POWER_BUTTON.innerHTML === 'Start') {
        resume();
        countingDown = setInterval(buttonPressed, delayInMilliseconds); //Driver for the timer
    } else {
        pause();
    }
}

function resume() {
    POWER_BUTTON.innerHTML = 'Stop'; //Switches HTML to Stop
}

function pause() {
    POWER_BUTTON.innerHTML = 'Start'; //Switches HTML to Start
    clearInterval(countingDown);
}

// Is there a way to make the colour changes less redundant and more dynamic?
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
