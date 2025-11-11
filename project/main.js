import './style.css'

const candle = document.getElementById('candle');
const flame = document.getElementById('flame');
const instruction = document.getElementById('instruction');
const messageContainer = document.getElementById('messageContainer');

let isBlown = false;

const happyBirthdaySong = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [
    { freq: 262, duration: 0.5 },
    { freq: 262, duration: 0.5 },
    { freq: 294, duration: 1 },
    { freq: 262, duration: 1 },
    { freq: 349, duration: 1 },
    { freq: 330, duration: 2 },
    { freq: 262, duration: 0.5 },
    { freq: 262, duration: 0.5 },
    { freq: 294, duration: 1 },
    { freq: 262, duration: 1 },
    { freq: 392, duration: 1 },
    { freq: 349, duration: 2 },
    { freq: 262, duration: 0.5 },
    { freq: 262, duration: 0.5 },
    { freq: 523, duration: 1 },
    { freq: 440, duration: 1 },
    { freq: 349, duration: 1 },
    { freq: 330, duration: 1 },
    { freq: 294, duration: 2 },
    { freq: 466, duration: 0.5 },
    { freq: 466, duration: 0.5 },
    { freq: 440, duration: 1 },
    { freq: 349, duration: 1 },
    { freq: 392, duration: 1 },
    { freq: 349, duration: 2 }
  ];

  let startTime = audioContext.currentTime;

  notes.forEach(note => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = note.freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + note.duration);

    startTime += note.duration;
  });

  return (startTime - audioContext.currentTime) * 1000;
};

const createHeartPops = (duration) => {
  const hearts = ['💕', '❤️', '💖', '💗'];
  const interval = setInterval(() => {
    const heart = hearts[Math.floor(Math.random() * hearts.length)];
    const heartEl = document.createElement('div');
    heartEl.className = 'heart-pop';
    heartEl.textContent = heart;

    const randomX = Math.random() * 400 - 200;
    const randomY = -Math.random() * 400 - 100;

    heartEl.style.setProperty('--tx', `${randomX}px`);
    heartEl.style.setProperty('--ty', `${randomY}px`);
    heartEl.style.left = '50%';
    heartEl.style.top = '50%';
    heartEl.style.transform = 'translate(-50%, -50%)';

    document.body.appendChild(heartEl);

    setTimeout(() => {
      heartEl.remove();
    }, 2000);
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
  }, duration);
};

candle.addEventListener('click', () => {
  if (isBlown) return;

  isBlown = true;
  flame.classList.add('blown');
  instruction.style.opacity = '0';

  setTimeout(() => {
    flame.style.display = 'none';
  }, 500);

  const songDuration = happyBirthdaySong();
  createHeartPops(songDuration);

  setTimeout(() => {
    messageContainer.classList.add('show');
  }, songDuration + 500);
});

messageContainer.addEventListener('click', () => {
  messageContainer.classList.remove('show');
});
