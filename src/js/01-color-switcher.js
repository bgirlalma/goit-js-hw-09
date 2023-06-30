const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

let intervalId;

buttonStart.addEventListener('click', bodyColorStart);
buttonStop.addEventListener('click', bodyColorStop);

function bodyColorStart() {
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    intervalId = setInterval(changeBackgroundColor, 1000);
}

function bodyColorStop() {
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    clearInterval(intervalId);
}

function changeBackgroundColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

console.log(getRandomHexColor());
