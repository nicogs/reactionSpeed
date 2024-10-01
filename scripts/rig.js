class Rig {
	constructor() {
		this.width = width * 0.8
		this.height = height * 0.8
		this.offset = createVector(width * 0.1, height * 0.1)
		this.discs = []

		this.addDiscs()
		this.session = new Session(this.discs.length, createVector(this.offset.x + 0.33 * this.width, this.offset.y), createVector(this.offset.x + 0.66 * this.width, this.offset.y))
	}

	display() {
		const barColors = [color("darkgrey"), color("lightgrey")]
		const barWidths = [15, 3]

		for (let i = 0; i < 2; i++) {
			push()
			stroke(barColors[i])
			strokeWeight(barWidths[i])
			line(this.offset.x + 0.25 * this.width, this.offset.y + 0.25 * this.height, this.offset.x, this.offset.y)
			line(this.offset.x, this.offset.y + this.height, this.offset.x, this.offset.y)
			line(this.offset.x, this.offset.y + this.height, this.offset.x + 0.5 * this.width, this.offset.y + 0.5 * this.height)
			line(this.offset.x + this.width, this.offset.y + this.height, this.offset.x + 0.5 * this.width, this.offset.y + 0.5 * this.height)
			line(this.offset.x + this.width, this.offset.y + this.height, this.offset.x + this.width, this.offset.y)
			line(this.offset.x + 0.75 * this.width, this.offset.y + 0.25 * this.height, this.offset.x + this.width, this.offset.y)
			line(this.offset.x + 0.5 * this.width, this.offset.y + this.height, this.offset.x + 0.5 * this.width, this.offset.y + 0.75 * this.height)
			line(this.offset.x + 0.25 * this.width, this.offset.y + 0.75 * this.height, this.offset.x + 0.75 * this.width, this.offset.y + 0.75 * this.height)
			pop()
			
		}

		
		// this.session.display()
		this.displayLabels()
	}

	displayDiscs() {
		this.discs.forEach(disc => disc.display())
	}

	displayLabels() {
		fill(20)
		textFont(font)
		textAlign(CENTER, CENTER);
		textSize(width / 50)

		text("TIME", this.offset.x + 0.33 * this.width, this.offset.y - (width/30))
		text("SCORE", this.offset.x + 0.66 * this.width, this.offset.y - (width/30))
	}

	displayResult(){
		const dialog = document.getElementById("sessionResults")
		const dialogHeading = document.getElementById("dialogHeading")
		const dialogText = document.getElementById("dialogText")
		const tryAgainBtn = document.getElementById("tryAgainBtn")

		dialogHeading.innerText = `You hit ${this.session.score} discs!`
		dialogText.innerText = `On average your reaction time was ${60/this.session.score} seconds`

		dialog.showModal()

		tryAgainBtn.addEventListener("click", () => {
			this.createNewSession()
			dialog.close()
		})

	}

	displaySession() { 
		if(this.session.timer > 0) {
			rectMode(CORNERS);
			fill(220);
			noStroke()
			rect(this.offset.x + 0.2 * this.width, this.offset.y-width / 40, this.offset.x + 0.8 * this.width, this.offset.y + width / 40);
			this.session.display()
		} else {
			this.displayResult()
		}
	}

	addDiscs() {
		const placements = [[0,0], [1,0], [0.25,0.25], [0.75,0.25], [0,0.5], [0.5,0.5], [1,0.5], [0.25,0.75], [0.75,0.75],[0,1], [0.5,1], [1,1]]
		for (let i = 0; i < placements.length; i++) {
			const disc = new Disc(this.offset.x + placements[i][0] * this.width, this.offset.y + placements[i][1] * this.height)
			if(i == 5) {
				disc.active = true 
			}
			this.discs.push(disc)			
		}
	}

	createNewSession() {
		background(220);
		this.display()
		this.discs = []
		this.addDiscs()
		this.session = new Session(this.discs.length, createVector(this.offset.x + 0.33 * this.width, this.offset.y), createVector(this.offset.x + 0.66 * this.width, this.offset.y))

	}

	finish

	tap(x, y) {

		if(this.session.timer > 0) {
			const activeDisc = this.discs[this.session.discIndex]
			const dinstance = Math.hypot(activeDisc.position.x - x, activeDisc.position.y - y)

			if(dinstance <= activeDisc.radius) {
				activeDisc.active = false
				const newActiveDiscIndex = this.session.updateScore()
				this.discs[newActiveDiscIndex].active = true
			}
		}
		
	}
}