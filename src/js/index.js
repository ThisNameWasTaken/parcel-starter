const loader = document.querySelector('.loader');

// TODO: Make it work with offscreen canvas
// TODO: Refactor everything inside a class

const canvas = document.getElementById('canvas');

const canvasOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const penOptions = {
  fillColor: '#48f',
  size: 50,
};

const hitOptions = {
  fillColor: '#4f3',
};

const missOptions = {
  fillColor: '#f43',
};

canvas.setAttribute('width', `${canvasOptions.width}px`);
canvas.setAttribute('height', `${canvasOptions.height}px`);

const offscreenCanvas = canvas.transferControlToOffscreen();

/** @type {CanvasRenderingContext2D} */
const ctx = offscreenCanvas.getContext('2d');

document.body.addEventListener('mousedown', startDrawing, { passive: true });
document.body.addEventListener('touchstart', startDrawing, { passive: true });

document.body.addEventListener('mousemove', draw, { passive: true });
document.body.addEventListener('touchmove', draw, { passive: true });

document.body.addEventListener('mouseup', stopDrawing, { passive: true });
document.body.addEventListener('touchend', stopDrawing, { passive: true });

let randomPoints = [];

const pointGeneratorWorker = new Worker('./pointGenerator.worker.js');

pointGeneratorWorker.addEventListener('message', event => {
  randomPoints = event.data.randomPoints;
});

let prevX;
let prevY;
let isDrawing = false;
function startDrawing(event) {
  ctx.fillStyle = penOptions.fillColor;
  ctx.strokeStyle = penOptions.fillColor;
  ctx.lineWidth = penOptions.size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  clearCanvas();
  ctx.beginPath();
  isDrawing = true;
  prevX = event.clientX || event.touches[0].clientX;
  prevY = event.clientY || event.touches[0].clientY;

  pointGeneratorWorker.postMessage({
    canvasWidth: canvasOptions.width,
    canvasHeight: canvasOptions.height,
  });
}

function draw(event) {
  if (!isDrawing) return;

  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;

  ctx.moveTo(prevX, prevY);
  ctx.lineTo(clientX, clientY);
  ctx.stroke();

  prevX = clientX;
  prevY = clientY;
}

function stopDrawing() {
  ctx.closePath();
  isDrawing = false;

  calculateSurface();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasOptions.width, canvasOptions.height);
}

function drawDot(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fill();
}

let lastTimestamp = undefined;

const surfaceEstimatorWorker = new Worker('./surfaceEstimator.worker.js');
surfaceEstimatorWorker.addEventListener(
  'message',
  ({ data: { hits, misses, estimatedSurface, timestamp } }) => {
    // TODO: Reset the worker instead of using a timestamp
    if (timestamp !== lastTimestamp) return;

    console.log({ estimatedSurface });

    ctx.fillStyle = hitOptions.fillColor;
    ctx.strokeStyle = hitOptions.fillColor;
    hits.forEach(hit => drawDot(...hit));

    ctx.fillStyle = missOptions.fillColor;
    ctx.strokeStyle = missOptions.fillColor;
    misses.forEach(hit => drawDot(...hit));
  }
);

const surfaceCalculatorWorker = new Worker('./surfaceCalculator.worker.js');
surfaceCalculatorWorker.addEventListener('message', ({ data: { surface } }) => {
  console.log({ surface });
});

function calculateSurface() {
  const canvasWidth = canvasOptions.width;
  const canvasHeight = canvasOptions.height;

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

  lastTimestamp = performance.now();

  surfaceEstimatorWorker.postMessage({
    imageData,
    randomPoints,
    canvasWidth,
    canvasHeight,
    timestamp: lastTimestamp,
  });

  surfaceCalculatorWorker.postMessage({
    imageData,
  });
}
