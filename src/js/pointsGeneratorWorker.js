self.addEventListener('message', event => {
  const randomPoints = calculateSurface({ ...event.data });
  self.postMessage({ randomPoints });
});

const randomBetween = (start, end) => Math.floor(Math.random() * end + start);

function calculateSurface({
  canvasWidth,
  canvasHeight,
  canvasPercentage = 0.01,
}) {
  const randomPointsCount = Math.floor(
    canvasWidth * canvasHeight * canvasPercentage
  );

  const randomPoints = [];

  for (let i = 0; i < randomPointsCount; i++) {
    const randomX = randomBetween(0, canvasWidth);
    const randomY = randomBetween(0, canvasHeight);

    randomPoints.push([
      randomX,
      randomY,
      randomY * canvasWidth * 4 + randomX * 4 + 3,
    ]);
  }

  return randomPoints;
}
