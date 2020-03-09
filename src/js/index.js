import { MDCSnackbar } from '@material/snackbar';
import { MDCRipple } from '@material/ripple';
import { MDCSlider } from '@material/slider';

document
  .querySelectorAll('.mdc-icon-button')
  .forEach(icon => (new MDCRipple(icon).unbounded = true));

const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

const canvas = document.getElementById('canvas');

const canvasOptions = {
  width: window.innerWidth,
  height: window.innerHeight - 48,
};

window.addEventListener('resize', () => {
  canvasOptions.width = window.innerHeight;
  canvasOptions.height = window.innerHeight;
});

const penOptions = {
  fillColor: '#48f',
  size: 50,
};

const slider = new MDCSlider(document.querySelector('.mdc-slider'));
slider.value = penOptions.size;
slider.listen('MDCSlider:change', () => (penOptions.size = slider.value));

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

canvas.addEventListener('mousedown', startDrawing, { passive: true });
canvas.addEventListener('touchstart', startDrawing, { passive: true });

canvas.addEventListener('mousemove', draw, { passive: true });
canvas.addEventListener('touchmove', draw, { passive: true });

canvas.addEventListener('mouseup', stopDrawing, { passive: true });
canvas.addEventListener('touchend', stopDrawing, { passive: true });

let randomPoints = [];

let pointGeneratorWorker;
let surfaceEstimatorWorker;
let surfaceCalculatorWorker;

const surface = {
  actual: 0,
  estimated: 0,
};

function startWorkers() {
  surfaceEstimatorWorker = new Worker('./surfaceEstimator.worker.js');
  surfaceEstimatorWorker.addEventListener(
    'message',
    ({ data: { hits, misses, estimatedSurface } }) => {
      surface.estimated = estimatedSurface;

      snackbar.labelText = `estimated surface: ${surface.estimated} actual surface: ${surface.actual}`;
      snackbar.open();

      ctx.fillStyle = hitOptions.fillColor;
      ctx.strokeStyle = hitOptions.fillColor;
      hits.forEach(hit => drawDot(...hit));

      ctx.fillStyle = missOptions.fillColor;
      ctx.strokeStyle = missOptions.fillColor;
      misses.forEach(hit => drawDot(...hit));
    }
  );

  surfaceCalculatorWorker = new Worker('./surfaceCalculator.worker.js');
  surfaceCalculatorWorker.addEventListener(
    'message',
    ({ data: { surface: actualSurface } }) => {
      surface.actual = actualSurface;
    }
  );

  pointGeneratorWorker = new Worker('./pointGenerator.worker.js');
  pointGeneratorWorker.addEventListener('message', event => {
    randomPoints = event.data.randomPoints;
  });
}

function stopWorkers() {
  surfaceEstimatorWorker && surfaceEstimatorWorker.terminate();
  surfaceCalculatorWorker && surfaceCalculatorWorker.terminate();
  pointGeneratorWorker && pointGeneratorWorker.terminate();
}

function restartWorkers() {
  stopWorkers();
  startWorkers();
}

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

  restartWorkers();

  pointGeneratorWorker.postMessage({
    canvasWidth: canvasOptions.width,
    canvasHeight: canvasOptions.height,
  });

  draw(event);
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

function calculateSurface() {
  const canvasWidth = canvasOptions.width;
  const canvasHeight = canvasOptions.height;

  const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;

  surfaceEstimatorWorker.postMessage({
    imageData,
    randomPoints,
    canvasWidth,
    canvasHeight,
  });

  surfaceCalculatorWorker.postMessage({
    imageData,
  });
}
