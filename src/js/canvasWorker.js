self.addEventListener('message', event => {
  console.log('sent');
  console.log(event);

  self.postMessage({ lorem: 'ipsum' });
});
