import { Particle } from './Particle.js';
import { Line } from './Line.js';

const NUM_OF_PARTICLES = 80;
let MAX_LINE_LENGTH = 1;
const BG_COLOR = 'hsl(193, 50%, 5%)';
const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let lines = [];

/**
 * Get distance between two particles (points)
 *
 * @param particleA
 * @param particleB
 * @returns {number}
 */
function distanceBetweenTwoParticles(particleA, particleB) {
  const sideA = particleA.pos.x - particleB.pos.x;
  const sideB = particleA.pos.y - particleB.pos.y;
  return Math.sqrt( sideA * sideA + sideB * sideB );
}

/**
 * Update lines to new particle locations (on each loop)
 */
function updateLines() {
  lines = [];
  for (let particle of particles) {
    for (let otherParticle of particles) {
      if (particle === otherParticle) continue;
      const distance = Math.abs(distanceBetweenTwoParticles(particle, otherParticle));
      if (distance < MAX_LINE_LENGTH) {
        lines.push(new Line(ctx, particle.pos, otherParticle.pos, particle.color, otherParticle.color));
      }
    }
  }
}

/**
 * Initialize some variables and create particles
 */
function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  MAX_LINE_LENGTH = canvas.width / 6;

  particles = [];
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(ctx, canvas.width, canvas.height));
  }

  loop();
}

/**
 * Animation loop
 *  - draw particles
 *  - update particles positions
 *  - update lines
 *  - draw lines
 */
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0,0,canvas.width, canvas.height);

  for (let particle of particles) {
    particle.update();
    particle.draw();
  }

  updateLines();

  for (let line of lines) {
    line.draw();
  }

  requestAnimationFrame(loop);
}

// Start animation
init();

addEventListener('resize', init)
