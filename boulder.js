// boulder.js
window.addEventListener('load', () => {
  const hour = new Date().getHours();
  const sky = document.querySelector('#sky');
  const triviaBtn = document.querySelector('#triviaBtn');
  const enterVR = document.querySelector('#enterVR');
  const exitVR = document.querySelector('#exitVR');
  const scene = document.querySelector('a-scene');

  if (hour >= 6 && hour < 18) {
    sky.setAttribute('color', '#88ccff'); // day
  } else if (hour >= 18 && hour < 21) {
    sky.setAttribute('color', '#ff8844'); // sunset
  } else {
    sky.setAttribute('color', '#001133'); // night
  }

  if (triviaBtn) triviaBtn.addEventListener('click', () => window.location.href = 'trivia.html');
  if (enterVR) enterVR.addEventListener('click', () => { if (scene && scene.enterVR) scene.enterVR(); });
  if (exitVR) exitVR.addEventListener('click', () => { if (scene && scene.exitVR) scene.exitVR(); });
});
