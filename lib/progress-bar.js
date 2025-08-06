const circle = document.querySelector(".fill");
const wrapperCircle = document.querySelector(".track");
const circleSvg = document.querySelector('.svg');
let radius = circle.r.baseVal.value;
let lenghtCircle = 2 * Math.PI * radius;
const input = document.getElementById('value');
const hide = document.querySelector('#hide-toggle');
const animate = document.querySelector('#animate-toggle');

let targetOffset;

input.addEventListener('input', function () {
    const clampedPercent = Math.max(0, Math.min(100, input.value))
    input.value = clampedPercent;
    targetOffset = input.value;
    setProcess(input.value);
})

circle.style.strokeDasharray = lenghtCircle;
circle.style.strokeDashoffset = lenghtCircle;

function setProcess(precent) {
    const offset = lenghtCircle - precent / 100 * lenghtCircle;
    circle.style.stroke = precent > 0 ? '#1A6CFF' : circle.style.stroke = '#EAF0F6';
    circle.style.strokeDashoffset = offset;
}

hide.addEventListener('change', function () {
    circleSvg.classList.toggle('hidden', this.checked);
})

animate.addEventListener('change', function () {
    circleSvg.classList.toggle('animated');
})



