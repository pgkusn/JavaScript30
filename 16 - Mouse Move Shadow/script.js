let length = 100;

let text = document.querySelector('h1');

document.querySelector('.hero').addEventListener('mousemove', function (e) {
    let { offsetX, offsetY } = e;
    
    if (e.target !== this) {
        offsetX += e.target.offsetLeft;
        offsetY += e.target.offsetTop;
    }
    
    let lengthX = Math.floor(offsetX / this.offsetWidth * length) * 2 - length;
    let lengthY = Math.floor(offsetY / this.offsetHeight * length) * 2 - length;

    text.style.textShadow = `
        ${lengthX * -0.6}px ${lengthY * -0.6}px 5px rgba(255,0,0,.8),
        ${lengthX * -0.8}px ${lengthY * -0.8}px 5px rgba(0,255,0,.8),
        ${-lengthX}px ${-lengthY}px 5px rgba(0,0,255,.8)
    `;
});