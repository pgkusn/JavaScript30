function removeTransition(event) {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing');
}

function playSound(event) {
    // const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    // const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    // if (!audio) return;
    // key.classList.add('playing');
    // audio.currentTime = 0;
    // audio.play();

    // CreateJS
    createjs.Sound.play(event.keyCode);
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    key.classList.add('playing');
}

window.addEventListener('keydown', playSound);

document.querySelectorAll('.key').forEach(val => {
    val.addEventListener('transitionend', removeTransition);
});

// CreateJS
const SOUNDS = [
    { src: './sounds/clap.wav', id: '65' },
    { src: './sounds/hihat.wav', id: '83' },
    { src: './sounds/kick.wav', id: '68' },
    { src: './sounds/kick.wav', id: '70' },
    { src: './sounds/boom.wav', id: '71' },
    { src: './sounds/ride.wav', id: '72' },
    { src: './sounds/snare.wav', id: '74' },
    { src: './sounds/tom.wav', id: '75' },
    { src: './sounds/tink.wav', id: '76' },
];
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerSounds(SOUNDS, "./");