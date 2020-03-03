self.addEventListener('message', event => {
  const surface = calculateSurface({ ...event.data });
  self.postMessage({ surface });
});

function calculateSurface({ imageData }) {
  let coloredPixels = 0;

  for (let i = 3; i < imageData.length; i += 4) {
    if (imageData[i] !== 0) {
      coloredPixels++;
    }
  }

  return coloredPixels;
}
