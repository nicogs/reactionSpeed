let mic


function preload() {

}

function setup() {
	mic = new p5.AudioIn()
	mic.start()
}

function draw() {
	let vol = mic.getLevel()
	console.log(vol)
}
