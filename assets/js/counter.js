
const pomodoroSelect = document.querySelector("#pomodoro");
const shortBreakSelect = document.querySelector("#short-break");
const longBreakSelect = document.querySelector("#long-break");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resetButton = document.querySelector("#reset");
const editButton = document.querySelector("#edit"); 
const editMinutesInput = document.querySelector("#edit-minutes"); 
const editSecondsInput = document.querySelector("#edit-seconds"); 
const timerParagraph = document.querySelector("#counter");

let selectedTimer = "pomodoro"; 
let timerInterval; 
let isPaused = false; 
let remainingSeconds; 

function changeSelectClasses(timer) {
    if (timer === "pomodoro") {
        pomodoroSelect.classList.add("active-button");
        shortBreakSelect.classList.remove("active-button");
        longBreakSelect.classList.remove("active-button");
    } else if (timer === "short-break") {
        pomodoroSelect.classList.remove("active-button");
        shortBreakSelect.classList.add("active-button");
        longBreakSelect.classList.remove("active-button");
    } else if (timer === "long-break") {
        pomodoroSelect.classList.remove("active-button");
        shortBreakSelect.classList.remove("active-button");
        longBreakSelect.classList.add("active-button");
    }
}

function secondsToMinutesSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const padSeconds = seconds.toString().padStart(2, "0");
    const padMinutes = minutes.toString().padStart(2, "0");

    return `${padMinutes}:${padSeconds}`;
}

function getTimerValue(timer) {
    return {
        pomodoro: 25 * 60,
        "short-break": 5 * 60,
        "long-break": 15 * 60,
    }[timer];
}

function changeTimerValue(timer) {
    remainingSeconds = getTimerValue(timer); 
    timerParagraph.textContent = secondsToMinutesSeconds(remainingSeconds);
}

function selectTimer(timer) {
    selectedTimer = timer;
    isPaused = false; 
    clearInterval(timerInterval); 
    changeSelectClasses(timer); 
    changeTimerValue(timer); 
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        runTimer(remainingSeconds);
        return;
    }

    clearInterval(timerInterval); 
    remainingSeconds = getTimerValue(selectedTimer);
    runTimer(remainingSeconds);
}

function runTimer(seconds) {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            seconds--;
            remainingSeconds = seconds;
            timerParagraph.textContent = secondsToMinutesSeconds(seconds);
            document.title = `${secondsToMinutesSeconds(seconds)} - Pomodoro Glass` ;
            if (seconds <= 0) {
                clearInterval(timerInterval); 
                timerParagraph.textContent = "00:00"; 
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval); 
}

function resetTimer() {
    isPaused = false;
    clearInterval(timerInterval); 
    changeTimerValue(selectedTimer);
}

function editTimer() {
    const minutes = parseInt(editMinutesInput.value, 10);
    const seconds = parseInt(editSecondsInput.value, 10);

    if (!isNaN(minutes) && !isNaN(seconds)) {
        remainingSeconds = (minutes * 60) + seconds;
        timerParagraph.textContent = secondsToMinutesSeconds(remainingSeconds);
        isPaused = true;
        clearInterval(timerInterval); 
    }
}


function makeTimerEditable() {
    timerParagraph.contentEditable = true;
    timerParagraph.focus();
}


function saveEditedTime() {
    timerParagraph.contentEditable = false;
    const [minutes, seconds] = timerParagraph.textContent.split(':').map(Number);

    if (!isNaN(minutes) && !isNaN(seconds)) {
        remainingSeconds = (minutes * 60) + seconds;
        timerParagraph.textContent = secondsToMinutesSeconds(remainingSeconds);
    } else {
        
        timerParagraph.textContent = secondsToMinutesSeconds(remainingSeconds);
    }
}


startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
editButton.addEventListener("click", editTimer);


timerParagraph.addEventListener("click", makeTimerEditable);
timerParagraph.addEventListener("blur", saveEditedTime);
