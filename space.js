// space.js
window.addEventListener('load', () => {
  const triviaBtn = document.querySelector('#triviaBtn');
  const enterVR = document.querySelector('#enterVR');
  const exitVR = document.querySelector('#exitVR');
  const scene = document.querySelector('a-scene');

  if (triviaBtn) triviaBtn.addEventListener('click', () => window.location.href = 'trivia.html');

  if (enterVR) enterVR.addEventListener('click', () => { if (scene && scene.enterVR) scene.enterVR(); });
  if (exitVR) exitVR.addEventListener('click', () => { if (scene && scene.exitVR) scene.exitVR(); });

  // gently rotate any model to make it feel alive
  const model = document.querySelector('[gltf-model]');
  let r = 0;
  function spin() {
    r += 0.1;
    if (model) model.setAttribute('rotation', `0 ${r} 0`);
    requestAnimationFrame(spin);
  }
  spin();
});
