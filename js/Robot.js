class Robot {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.velocity = createVector(1, 1)
    this.acceleration = createVector(0, 0)

    this.r = cellWidth * 0.75
    this.maxspeed = 5
    this.maxforce = 0.25
  }

  update() { // Method to update location
    this.velocity.add(this.acceleration) // Update velocity
    this.velocity.limit(this.maxspeed) // Limit speed
    this.position.add(this.velocity)
    this.acceleration.mult(0) // Reset accelerationelertion to 0 each cycle
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  seek(target) { // Steer = Desired - Velocity
    let desired = p5.Vector.sub(target, this.position)
    let d = desired.mag()

    if (d < cellWidth) {
      let m = map(d, 0, cellWidth, 0, this.maxspeed)
      desired.setMag(m)
    } else desired.setMag(this.maxspeed) // Scale to maximum speed

    let steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce)

    this.applyForce(steer)
  }

  avoid(obsctacle) {
    let avoid = p5.Vector.sub(obsctacle, this.position)
    avoid.mult(-1)
    let dist = avoid.mag()
    avoid.setMag(this.maxspeed)

    let rule = this.fuzzyfication(dist)
    let strength = this.rules(rule)
    let limit = this.defuzzyfication(strength)

    let steer = p5.Vector.sub(avoid, this.velocity)

    steer.limit(limit)
    this.applyForce(steer)
  }

  show() {
    let angle = this.velocity.heading() + PI / 2

    fill(127)
    stroke(200)
    strokeWeight(1)

    push()
      translate(this.position.x, this.position.y)
      rotate(angle)
      ellipse(0, 0, this.r, this.r)
    pop()
  }

  fuzzyfication(dist) {
    switch (true) {
      case (dist < cellWidth * .5):
        return 'veryShort'
        break;

      case (dist >= cellWidth * .5 && dist < cellWidth):
        return 'short'
        break;

      case (dist >= cellWidth && dist < cellWidth * 1.5):
        return 'mean'
        break;

      case (dist >= cellWidth * 1.5 && dist < cellWidth * 2):
        return 'far'
        break;

      default:
        return 'veryFar'
    }
  }

  rules(rule) {
    switch (true) {
      case (rule == 'veryShort'):
        return 'veryStrong'
        break;

      case (rule == 'short'):
        return 'strong'
        break;

      case (rule == 'mean'):
        return 'medium'
        break;

      case (rule == 'far'):
        return 'weak'
        break;

      default:
        return 'null'
    }
  }

  defuzzyfication(strength) {
    switch (true) {
      case (strength == 'veryStrong'):
        return this.maxspeed * .75
        break;

      case (strength == 'strong'):
        return this.maxspeed * .025
        break;

      case (strength == 'medium'):
        return this.maxspeed * .01
        break;

      case (strength == 'weak'):
        return this.maxspeed * .001
        break;

      default:
        return this.maxspeed * 0
    }
  }
}
