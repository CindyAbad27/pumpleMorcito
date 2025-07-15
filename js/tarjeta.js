
document.addEventListener('DOMContentLoaded', () => {
 
  const surpriseBtn = document.getElementById('surpriseBtn');
  const surpriseMsg = document.getElementById('surpriseMsg');

  if (surpriseBtn && surpriseMsg) {
    surpriseBtn.addEventListener('click', () => {
      surpriseMsg.classList.toggle('hidden');
      surpriseBtn.textContent = surpriseMsg.classList.contains('hidden')
        ? 'Mostrar mensaje sorpresa'
        : 'Ocultar mensaje sorpresa';
    });
  }


  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti-container');
  document.body.appendChild(confettiContainer);

  const balloonContainer = document.createElement('div');
  balloonContainer.classList.add('balloon-container');
  document.body.appendChild(balloonContainer);


  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const confettiColors = ['#ff4e72', '#ff96a5', '#d9003f', '#ff2e59', '#ffd6e8'];
  const balloonColors = ['#f44336', '#e91e63', '#9c27b0', '#2196f3', '#4caf50'];


  function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.setProperty('--confetti-color', confettiColors[randomInt(0, confettiColors.length - 1)]);
    confetti.style.left = randomInt(0, window.innerWidth) + 'px';
    confetti.style.animationDuration = randomInt(3, 6) + 's';
    confetti.style.animationDelay = '0s';
    confettiContainer.appendChild(confetti);

    confetti.addEventListener('animationend', () => confetti.remove());
  }


  function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    const color = balloonColors[randomInt(0, balloonColors.length - 1)];
    balloon.style.background = `radial-gradient(circle at 20% 30%, ${color}, ${shadeColor(color, -40)})`;

    balloon.style.left = randomInt(0, window.innerWidth - 40) + 'px';
    balloon.style.animationDuration = randomInt(7, 12) + 's';
    balloon.style.animationDelay = '0s';
    balloonContainer.appendChild(balloon);

    balloon.addEventListener('animationend', () => balloon.remove());
  }

 
  function shadeColor(color, percent) {
    let f = parseInt(color.slice(1), 16);
    let t = percent < 0 ? 0 : 255;
    let p = percent < 0 ? percent * -1 : percent;
    let R = f >> 16;
    let G = (f >> 8) & 0x00FF;
    let B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p / 100) + R) * 0x10000 + (Math.round((t - G) * p / 100) + G) * 0x100 + (Math.round((t - B) * p / 100) + B)).toString(16).slice(1);
  }


  setInterval(createConfettiPiece, 300);
  setInterval(createBalloon, 1500);
});
