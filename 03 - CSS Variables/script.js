function setStyle(e) {
    let name = e.target.name;
    let value = e.target.value;
    let unit = e.target.dataset.sizing || '';
    document.querySelector(':root').style.setProperty(`--${name}`, `${value}${unit}`);
}

document.querySelectorAll('input').forEach(el => {
    el.addEventListener('change', setStyle);
    el.addEventListener('mousemove', setStyle);
});