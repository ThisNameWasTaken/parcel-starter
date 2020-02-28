const canvas = document.getElementById('canvas');

const canvasOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  fillColor: '#48f',
  lineWidth: 50,
};

canvas.setAttribute('width', `${canvasOptions.width}px`);
canvas.setAttribute('height', `${canvasOptions.height}px`);

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

window.addEventListener('pointerdown', startDrawing, { passive: true });

window.addEventListener('pointermove', draw, { passive: true });

window.addEventListener('pointerup', stopDrawing, { passive: true });
window.addEventListener('pointerout', stopDrawing, { passive: true });
window.addEventListener('pointerleave', stopDrawing, { passive: true });
window.addEventListener('pointercancel', stopDrawing, { passive: true });

// Draw inner shape
ctx.fillStyle = canvasOptions.fillColor;
ctx.lineCap = 'round';

let isDrawing = false;
function startDrawing(event) {
  clearCanvas();
  ctx.moveTo(event.clientX, event.clientY);
  isDrawing = true;
}

function draw(event) {
  if (!isDrawing) return;

  const stepCount = Math.max(
    Math.abs(event.movementX),
    Math.abs(event.movementY)
  );
  const xStep = event.movementX / stepCount;
  const yStep = event.movementY / stepCount;

  for (let i = 0; i <= stepCount; i++) {
    drawCircle(event.clientX + i * xStep, event.clientY + i * yStep);
  }
}

function stopDrawing(event) {
  isDrawing = false;
  // calculateSurface();
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

    if (ctx.isPointInPath(randomX, randomY)) {
      if (!hits.find(equalsPoint(randomX, randomY))) {
        hits.push([randomX, randomY]);
      }
    } else {
      if (!misses.find(equalsPoint(randomX, randomY))) {
        misses.push([randomX, randomY]);
      }
    }
  }

  const pointsCount = hits.length + misses.length;
  const hitsCount = hits.length;
  const surface = Math.floor(
    (hitsCount / pointsCount) * (canvasOptions.width * canvasOptions.height)
  );

  console.log({ surface });
}
