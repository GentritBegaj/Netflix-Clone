console.log('Hi there! 🔥');
const shit = '💩',
  fire = '🔥',
  rocket = '🚀',
  poudzo = '👍🏻';

const imgsDom = document.querySelectorAll('.row img');

imgsDom.forEach((img, idx) => (img.src = `prof-pic/${idx}.png`));
