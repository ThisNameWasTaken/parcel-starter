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

document.body.addEventListener('pointerdown', startDrawing, { passive: true });

document.body.addEventListener('pointermove', draw, { passive: true });

document.body.addEventListener('pointerup', stopDrawing, { passive: true });

let randomPoints = [];

const pointsGeneratorWorker = new Worker('./pointsGeneratorWorker.js');

pointsGeneratorWorker.addEventListener('message', event => {
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
  prevX = event.clientX;
  prevY = event.clientY;

  pointsGeneratorWorker.postMessage({
    canvasWidth: canvasOptions.width,
    canvasHeight: canvasOptions.height,
  });
}

function draw(event) {
  if (!isDrawing) return;

  ctx.moveTo(prevX, prevY);
  ctx.lineTo(event.clientX, event.clientY);
  ctx.stroke();

  prevX = event.clientX;
  prevY = event.clientY;
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

const equalsPoint = (x, y) => ([_x, _y]) => _x === x && _y === y;

function calculateSurface() {
  const hits = [];
  const misses = [];

  for (let i = 0; i < randomPoints.length; i++) {
    const [randomX, randomY] = randomPoints[i];

    const alpha = ctx.getImageData(randomX, randomY, 1, 1).data[3];
    if (alpha !== 0) {
      if (!hits.find(equalsPoint(randomX, randomY))) {
        hits.push([randomX, randomY]);
      }
    } else {
      if (!misses.find(equalsPoint(randomX, randomY))) {
        misses.push([randomX, randomY]);
      }
    }
  }

  ctx.fillStyle = hitOptions.fillColor;
  ctx.strokeStyle = hitOptions.fillColor;

  hits.forEach(hit => drawDot(...hit));

  ctx.fillStyle = missOptions.fillColor;
  ctx.strokeStyle = missOptions.fillColor;
  misses.forEach(hit => drawDot(...hit));

  const pointsCount = hits.length + misses.length;
  const hitsCount = hits.length;
  const surface = Math.floor(
    (hitsCount / pointsCount) * (canvasOptions.width * canvasOptions.height)
  );

  console.log({ surface });

  return surface;
}
