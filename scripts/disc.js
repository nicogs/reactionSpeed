class Disc {
	constructor(x, y) {
		this.position = createVector(x, y)
		this.radius = width / 40
		this.active = false
	}

	display() {
		push()
		noStroke()
		fill(20)
		circle(this.position.x, this.position.y, 2 * this.radius)
		if(this.active) {
			fill("#FF520E")
			circle(this.position.x, this.position.y, 1.2 * this.radius)
		} else {
			fill(235)
			circle(this.position.x, this.position.y, 1.2 * this.radius)
			fill(20)
			circle(this.position.x, this.position.y, 0.6 * this.radius)
		}
		
		pop()
	}
}