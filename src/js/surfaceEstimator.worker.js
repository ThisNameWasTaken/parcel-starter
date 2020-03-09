self.addEventListener('message', event => {
  self.postMessage({ ...estimateSurface({ ...event.data }) });
});

const equalsPoint = (x, y) => ([_x, _y]) => _x === x && _y === y;

function estimateSurface({
  imageData,
  randomPoints,
  canvasWidth,
  canvasHeight,
}) {
  const hits = [];
  const misses = [];

  for (let i = 0; i < randomPoints.length; i++) {
    const [randomX, randomY, imageDataIndex] = randomPoints[i];

    const alpha = imageData[imageDataIndex];
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

  const pointsCount = hits.length + misses.length;
  const hitsCount = hits.length;
  const estimatedSurface = Math.floor(
    (hitsCount / pointsCount) * (canvasWidth * canvasHeight)
  );

  return { estimatedSurface, hits, misses };
}
