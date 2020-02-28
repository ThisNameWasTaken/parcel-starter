const canvas = document.getElementById('canvas');

const canvasOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  fillColor: '#48f',
  lineWidth: 50,
};

const hitOptions = {
  fillColor: '#4f3',
};

const missOptions = {
  fillColor: '#f43',
};

canvas.setAttribute('width', `${canvasOptions.width}px`);
canvas.setAttribute('height', `${canvasOptions.height}px`);

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

document.body.addEventListener('pointerdown', startDrawing, { passive: true });

document.body.addEventListener('pointermove', draw, { passive: true });

document.body.addEventListener('pointerup', stopDrawing, { passive: true });
// window.addEventListener('pointerout', stopDrawing, { passive: true });
// window.addEventListener('pointerleave', stopDrawing, { passive: true });
// window.addEventListener('pointercancel', stopDrawing, { passive: true });

// Draw inner shape
ctx.fillStyle = canvasOptions.fillColor;
ctx.strokeStyle = canvasOptions.fillColor;
ctx.lineWidth = canvasOptions.lineWidth;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let prevX;
let prevY;
let isDrawing = false;
function startDrawing(event) {
  clearCanvas();
  ctx.beginPath();
  isDrawing = true;
  prevX = event.clientX;
  prevY = event.clientY;
}

function draw(event) {
  if (!isDrawing) return;

  ctx.moveTo(prevX, prevY);
  ctx.lineTo(event.clientX, event.clientY);
  ctx.stroke();

  prevX = event.clientX;
  prevY = event.clientY;
}

function stopDrawing(event) {
  ctx.closePath();
  isDrawing = false;
  calculateSurface();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasOptions.width, canvasOptions.height);
}

function drawCircle(x, y, radius = canvasOptions.lineWidth) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function calculateSurface() {
  const screenPercentage = 0.01;

  const randomPointsCount = Math.floor(
    canvasOptions.height * canvasOptions.width * screenPercentage
  );

  console.log({ randomPointsCount });

  const randomBetween = (start, end) => Math.floor(Math.random() * end + start);

  const hits = [];
  const misses = [];

  const equalsPoint = (x, y) => ([_x, _y]) => _x === x && _y === y;

  for (let i = 0; i < randomPointsCount; i++) {
    const randomX = randomBetween(0, canvasOptions.width);
    const randomY = randomBetween(0, canvasOptions.height);

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

  hits.forEach(hit => drawCircle(...hit, 1));

  ctx.fillStyle = missOptions.fillColor;
  ctx.strokeStyle = missOptions.fillColor;
  misses.forEach(hit => drawCircle(...hit, 1));

  ctx.fillStyle = canvasOptions.fillColor;
  ctx.strokeStyle = canvasOptions.fillColor;

  const pointsCount = hits.length + misses.length;
  const hitsCount = hits.length;
  const surface = Math.floor(
    (hitsCount / pointsCount) * (canvasOptions.width * canvasOptions.height)
  );

  console.log({ surface });
}
