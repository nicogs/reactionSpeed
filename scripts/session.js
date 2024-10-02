

class Session {
	constructor(discAmount,scorePos, timerPos) {
		this.score = 0

		this.discAmount = discAmount
		this.discIndex = 5

		this.timer = 120000
		this.endTime = undefined

		this.scorePosition = scorePos
		this.timerPosition = timerPos
	}

	display() {
		
		fill("#ff520e")
		textFont(font)
		textAlign(CENTER, CENTER);
		textSize(width / 20)
		


		let scoreText
		if(this.score < 10) {
			scoreText = "00" + this.score
		} else if (this.score < 100) {
			scoreText = "0" + this.score
		} else {
			scoreText = this.score
		}

		text(scoreText, this.scorePosition.x, this.scorePosition.y)
		
		let timeText
		if(this.timer/100 < 10) {
			timeText = "00" + Math.floor(this.timer/100)
		} else if (this.timer/100 < 100) {
			timeText = "0" + Math.floor(this.timer/100)
		} else {
			timeText = Math.floor(this.timer/100)
		}


		text(timeText, this.timerPosition.x, this.timerPosition.y)
	}

	updateTimer() {
		if(this.endTime != undefined && this.timer > 0) {
			this.timer = Math.max(this.endTime - Date.now(), 0 )
		} else {
			this.endTime = undefined
		}
	}

	updateScore() {

		if(this.timer > 0) {

			if(this.endTime == undefined) {
				this.startSession()
			}
			
			this.score++

			let newIndex = this.discIndex
			do {
				newIndex = Math.floor(random(this.discAmount))
			} while (newIndex == this.discIndex)

			this.discIndex = newIndex

			return newIndex
		}

		
	}

	startSession() {
		this.endTime = Date.now() + this.timer
	}

	finishSession() {
		
		this.endTime = undefined

		
	}

	                                                                                                                                                                                        
}