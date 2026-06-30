let centiseconds = 0;
let minutes = 0;
let seconds = 0;
let intervalId = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const centisecondsDisplay = document.getElementById('centiseconds');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('stop').addEventListener('click', stop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    centisecondsDisplay.textContent = centiseconds.toString().padStart(2, '0');
}

function start() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        centiseconds++;
        if (centiseconds === 100) {
            centiseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
}

function stop() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
}

function reset() {
    stop();
    centiseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

function lap() {
    if (!intervalId) return;
    const lapTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.prepend(li);
}

updateDisplay();