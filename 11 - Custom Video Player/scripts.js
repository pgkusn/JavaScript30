const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skips = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
let isMouseDown = false;

function togglePlay() {
    let method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipHandler() {
    let skipTime = this.dataset.skip;
    video.currentTime += parseFloat(skipTime);
}

function rangeHandler() {
    if (event.type === 'mousemove' && !isMouseDown) return;
    let method = this.name;
    let value = parseFloat(this.value);
    video[method] = value;
}

function progressHandler(e) {
    if (e.type === 'mousemove' && !isMouseDown) return;
    let scrubTime = e.offsetX / this.offsetWidth * video.duration;
    video.currentTime = scrubTime;
}

function timeupdateHandler() {
    let percent = video.currentTime / video.duration * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

skips.forEach(skip => skip.addEventListener('click', skipHandler));

ranges.forEach(range => range.addEventListener('change', rangeHandler));
ranges.forEach(range => range.addEventListener('mousemove', rangeHandler));

progress.addEventListener('click', progressHandler);
progress.addEventListener('mousemove', progressHandler);

video.addEventListener('timeupdate', timeupdateHandler);
