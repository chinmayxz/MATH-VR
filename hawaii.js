// hawaii.js
window.addEventListener('load', () => {
  const hour = new Date().getHours();
  const sky = document.querySelector('#sky');
  const water = document.querySelector('#water');
  const waves = document.querySelector('#waves');
  const triviaBtn = document.querySelector('#triviaBtn');
  const enterVR = document.querySelector('#enterVR');
  const exitVR = document.querySelector('#exitVR');
  const scene = document.querySelector('a-scene');

  // Set sky color by local device time (simple mapping)
  if (hour >= 6 && hour < 18) {
    sky.setAttribute('color', '#87CEEB'); // day
  } else if (hour >= 18 && hour < 21) {
    sky.setAttribute('color', '#FF7F50'); // sunset
  } else {
    sky.setAttribute('color', '#0b1a3b'); // night
  }

  // Play ambient waves if audio exists
  if (waves && waves.components && !waves.isPlaying) {
    // For A-Frame audio element we can set to play:
    try { waves.play(); } catch (e) { /* autoplay restrictions may block until user interaction */ }
  }

  // Simple water animation: animate position.y slightly to simulate gentle rise/fall.
  let t = 0;
  function animateWater() {
    t += 0.02;
    // up/down bob
    const y = Math.sin(t) * 0.05;
    water.setAttribute('position', `0 ${y} 0`);
    // slowly rotate to feel dynamic
    water.setAttribute('rotation', `-90 ${Math.sin(t) * 0.2} 0`);
    requestAnimationFrame(animateWater);
  }
  animateWater();

  // Button handlers
  if (triviaBtn) triviaBtn.addEventListener('click', () => window.location.href = 'trivia.html');

  // Enter VR
  if (enterVR) enterVR.addEventListener('click', () => {
    // A-Frame exposes enterVR()
    if (scene && scene.enterVR) scene.enterVR();
  });

  if (exitVR) exitVR.addEventListener('click', () => {
    if (scene && scene.exitVR) scene.exitVR();
  });
});
