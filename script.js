// Select all portals
const portals = document.querySelectorAll('.portal');

// Hover glow effect
portals.forEach(portal => {
  portal.addEventListener('mouseenter', () => {
    portal.setAttribute('material', 'emissiveIntensity', 1);
  });

  portal.addEventListener('mouseleave', () => {
    portal.setAttribute('material', 'emissiveIntensity', 0.6);
  });

  // Click to simulate entering a portal
  portal.addEventListener('click', () => {
    const id = portal.getAttribute('id');
    console.log(`Entering ${id} portal...`);
    const text = document.createElement('a-entity');
    text.setAttribute('text', `value: Welcome to ${id.charAt(0).toUpperCase() + id.slice(1)} Lab!; color: yellow; align: center; width: 6`);
    text.setAttribute('position', '0 2 -2');
    document.querySelector('a-scene').appendChild(text);
  });
});
