let circleY = 0
let pixelCount
let pixels = []

var canvas

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    canvas.position(0, 0)
    canvas.style('z-index', '-1')

    pixelCount = (windowWidth * windowHeight) / 18000
    console.log(pixelCount)
    // put setup code here
    frameRate(24)
    for (let i = 0; i < pixelCount; i++) {
        tmp = new Pixel()
        pixels.push(tmp)
    }
}

function draw() {
    background(0)

    for (let i = 0; i < pixelCount; i++) {
        pixels[i].move()
        pixels[i].display()
        for (let j = 0; j < pixelCount; j++) {
            if (j != i) {
                let distance = calcDistance(pixels[i], pixels[j])
                if (distance <= 100) {
                    stroke(200)
                    line(pixels[i].x, pixels[i].y, pixels[j].x, pixels[j].y)
                } else if (distance <= 120) {
                    stroke(200, 200, 200, 100)

                    line(pixels[i].x, pixels[i].y, pixels[j].x, pixels[j].y)
                }
            }
        }
    }
}

function calcDistance(pixel1, pixel2) {
    let disX = pixel1.x - pixel2.x
    let disY = pixel1.y - pixel2.y

    let dis = sqrt(disX * disX + disY * disY)
    return dis
}

class Pixel {
    constructor() {
        // lower speed means faster
        let speed = getRandomNumber(1, 10)
        this.x = random(windowWidth)
        this.y = random(windowHeight)
        this.speedY = random(-200, 200) / (100 * speed)
        this.speedX = random(-200, 200) / (100 * speed)
    }

    move() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x >= windowWidth || this.x <= 0) {
            this.speedX = this.speedX * -1
        }
        if (this.y >= windowHeight || this.y <= 0) {
            this.speedY = this.speedY * -1
        }
    }

    display() {
        circle(this.x, this.y, 3)
        noStroke()
    }
}

function getRandomNumber(min, max) {
    // Ensure min is less than or equal to max
    if (min > max) {
        ;[min, max] = [max, min] // Swap if min is larger
    }

    // Generate random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random()

    // Calculate the difference between max and min
    const difference = max - min

    // Scale the random decimal by the range and add the minimum
    return randomDecimal * difference + min
}
