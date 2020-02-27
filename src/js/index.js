const canvas = document.getElementById('canvas');

const canvasOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

canvas.setAttribute('width', `${canvasOptions.width}px`);
canvas.setAttribute('height', `${canvasOptions.height}px`);

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

// Draw inner shape
ctx.beginPath();
ctx.fillStyle = '#48f';
ctx.moveTo(120, 120);
ctx.lineTo(250, 120);
ctx.lineTo(250, 250);
ctx.lineTo(120, 250);
ctx.lineTo(120, 120);
ctx.fill();
ctx.closePath();

const randomPointsCount = Math.floor(
  (canvasOptions.height * canvasOptions.width) / 1000
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
const surface =
  (hitsCount / pointsCount) * (canvasOptions.width * canvasOptions.height);

console.log({ surface });
