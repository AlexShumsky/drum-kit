'Use strict'
const keys = document.querySelectorAll('.key');
const instruments = document.querySelectorAll('.instrument');
const audios = document.querySelectorAll('.audio');


/****************************PLAY ACTIVE KEY************************************/
window.addEventListener('keydown', function (key) {
	playKey(key.keyCode);
});
keys.forEach(key => key.addEventListener('click', () => {
	const currentKeyNum = key.classList[1].slice(1);
	playKey(currentKeyNum);
}));
function playKey(key) {
	animateActiveKey(key);
	playAudio(key);
}

function animateActiveKey(num) {
	const activeKey = document.querySelector(`.k${num}`);

	if (!activeKey) return;

	activeKey.classList.add('active');
	activeKey.addEventListener('transitionend', function () {
		this.classList.remove('active');
		setTimeout(() =>
			(this.classList.contains('active') ? this.classList.remove('active') : ''), 1000)
	})
}

function playAudio(audioNum) {
	const activeAudio = document.querySelector(`#k${audioNum}`);

	if (!activeAudio) return;

	activeAudio.currentTime = 0;
	activeAudio.play();
}
/****************************CHANGE ACTIVE INSTRUMENT************************************/
instruments.forEach(instrument => instrument.addEventListener('click', setInstrumentActive))
function setInstrumentActive() {
	removeOtherInstrumentActiveClass();
	addInstrumentActiveClass(this);
	changeInstrument(this);
}
function removeOtherInstrumentActiveClass() {
	instruments.forEach(instrument => instrument.classList.remove('active-instrument'));
}
function addInstrumentActiveClass(instrument) {
	instrument.classList.add('active-instrument');
}
function changeInstrument(instrumentClass) {
	const instrument = instrumentClass.classList[0];
	const instrumentSrc = `assets/audio/${instrument}/`;
	audios.forEach((audio, i) => audio.src = (instrument == 'drum') ? `${instrumentSrc}track_${i + 1}.wav` :
		`${instrumentSrc}track_${i + 1}.mp3`);
}
