function playSound(e) {
  var audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  var key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (!audio) return;

  key.classList.add('keys__key_playing');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;

  console.log('work');
  e.target.classList.remove('keys__key_playing');
}

var keys = document.querySelectorAll('.keys__key');

keys.forEach(function(key) {
  key.addEventListener('transitionend', removeTransition)
});

window.addEventListener('keydown', playSound);