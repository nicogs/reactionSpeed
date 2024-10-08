let rig, font

// dialog.addEventListener("click", showSessionResults)
function preload() {
	font = loadFont("./fonts/digital.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  rig = new Rig()
  rig.display()
}

function draw() {
	rig.displayDiscs()
	rig.session.updateTimer()
	rig.displaySession()
}

function mouseClicked() {
	rig.tap(mouseX, mouseY)
}

function touchStarted() {
	for (let touch of touches) {
		rig.tap(touch.x, touch.y);
	}
  }

function showSessionResults() {

}