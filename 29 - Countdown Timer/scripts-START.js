let timer = null;

const buttons = document.querySelectorAll('.timer__controls > button');
const custom = document.querySelector('#custom');

buttons.forEach(el => el.addEventListener('click', startTimer));
custom.addEventListener('submit', startTimer);

function startTimer() {
    event.preventDefault();
    let seconds = getSelectedTime(event);
    if (!seconds) return;
    displayEndTime(seconds);
    displayTimeLeft(seconds);
    setTimer(seconds);
}

function setTimer(seconds) {
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(() => {
        seconds--;
        displayTimeLeft(seconds);
        if (seconds === 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function displayTimeLeft(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    let display = `${min}:${formatTime(sec)}`;
    document.querySelector('.display__time-left').textContent = display;
    document.title = display;
}

function displayEndTime(seconds) {
    let timestamp = new Date().getTime() + seconds * 1000;
    let d = new Date(timestamp);
    let hour = d.getHours();
    let min = d.getMinutes();
    document.querySelector('.display__end-time').textContent = `Be Back At ${hour}:${formatTime(min)}`;
}

function getSelectedTime(e) {
    if (e.type === 'click') {
        value = e.target.dataset.time;
    }
    else if (e.type === 'submit') {
        value = e.currentTarget.firstElementChild.value.trim() * 60;
        e.currentTarget.reset();
    }
    return parseInt(value, 10);
}

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}