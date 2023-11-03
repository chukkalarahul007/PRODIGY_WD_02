let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let interval;
let lapCounter = 1;

function startStop() {
  const startStopButton = document.getElementById('startStop');
  if (isRunning) {
    clearInterval(interval);
    startStopButton.innerText = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    startStopButton.innerText = 'Stop';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(interval);
  document.getElementById('display').innerText = '00:00:00';
  document.getElementById('startStop').innerText = 'Start';
  document.getElementById('laps').innerHTML = '';
  lapCounter = 1;
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
}

function recordLap() {
    if (isRunning) {
      const formattedTime = formatTime(elapsedTime);
      const lapItem = document.createElement('li');
      lapItem.innerText = `Lap ${lapCounter}: ${formattedTime}`;
      document.getElementById('laps').appendChild(lapItem);
      lapCounter++;
  
      
      const lapList = document.getElementById('laps');
      lapList.scrollTop = lapList.scrollHeight;
    }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.getElementById('display').innerText = formattedTime;
}

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor(ms % 1000).toString().slice(0, 2).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  }
  
  
  

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);
