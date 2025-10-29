//for firebase, data storage

// Attach click handlers on index.html to navigate between pages

window.addEventListener('load', () => {
  const hawaii = document.querySelector('#hawaiiPortal');
  const space = document.querySelector('#spacePortal');
  const boulder = document.querySelector('#boulderPortal');
  const lb = document.querySelector('#leaderboardBtn');

  if (hawaii) hawaii.addEventListener('click', () => window.location.href = 'hawaii.html');
  if (space) space.addEventListener('click', () => window.location.href = 'space.html');
  if (boulder) boulder.addEventListener('click', () => window.location.href = 'boulder.html');
  if (lb) lb.addEventListener('click', () => window.location.href = 'leaderboard.html');
});
