const hour = document.querySelector('.hour-hand');
const min = document.querySelector('.min-hand');
const second = document.querySelector('.second-hand');

function setTime() {
    let date = new Date();
    let hourDeg = date.getHours() * 30 + date.getMinutes() * 30 / 60; // 30deg = 360/12
    let minDeg = date.getMinutes() * 6 + date.getSeconds() * 6 / 60; // 6deg = 360/60
    let secondDeg = date.getSeconds() * 6; // 6deg = 360/60
    
    hour.style.transform = `rotate(${hourDeg}deg)`;
    min.style.transform = `rotate(${minDeg}deg)`;
    second.style.transform = `rotate(${secondDeg}deg)`;
    
    requestAnimationFrame(setTime);
}

requestAnimationFrame(setTime);
