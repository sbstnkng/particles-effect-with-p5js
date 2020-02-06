const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const particlesCount = Math.floor(window.innerWidth / 10);

    for(let index = 0; index < particlesCount; index++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        particle.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor() {
        // Position
        this.pos = createVector(random(width), random(height));
        // Velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
        // Size
        this.size = 10;
    }

    // Update movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    // Draw single particle
    draw() {
        noStroke();
        fill('rgba(255, 255, 255, 0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    // Detect edges
    edges() {
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }

        if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    // Connect particles
    checkParticles(particles) {
        particles.forEach(particle => {
            const distance = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if (distance < 120) {
                stroke('rgba(255, 255, 255, 0.1)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }
        });
    }
}