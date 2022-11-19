const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
            video.srcObject = mediaStream;
            video.onloadedmetadata = () => {
                paintToCanvas();
                video.play();
            };
        })
        .catch(function (err) { console.log(err.name + ": " + err.message); });
}

function paintToCanvas() {
    const width = video.videoWidth
    const height = video.videoHeight
    canvas.width = width;
    canvas.height = height;

    // debug
    // ctx.drawImage(video, 0, 0, width, height);
    // let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels.data[0], pixels.data[1], pixels.data[2]);

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);

        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);

        ctx.clearRect(0, 0, width, height);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] += 200;
        pixels.data[i + 1] -= 50;
        pixels.data[i + 2] *= 0.5;
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];
        pixels.data[i + 500] = pixels.data[i + 1];
        pixels.data[i - 550] = pixels.data[i + 2];
    }
    return pixels;
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    let data = canvas.toDataURL('image/webp');
    let link = document.createElement('A');
    link.href = data;
    link.download = 'hello';
    link.innerHTML = `<img src="${data}">`;
    strip.insertBefore(link, strip.firstChild);
}

getVideo();