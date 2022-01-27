import { randomIntFromInterval } from './utils.js'

export class Particle {
  constructor(ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.floor(Math.random() * canvasWidth);
    this.y = Math.floor(Math.random() * canvasHeight);
    this.speed = randomIntFromInterval(0.5, 4);
    this.xVel = (Math.random() - .5) * this.speed;
    this.yVel = (Math.random() - .5) * this.speed;
    this.size = randomIntFromInterval(5, 7);
    this.color = `hsl(${randomIntFromInterval(0, 360)}, 35%, 50%)`;
  }

  get pos() {
    return {
      x: this.x,
      y: this.y,
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    if (this.x < 0) {
      this.x += this.canvasWidth;
    } else if ( this.x > this.canvasWidth) {
      this.x -= this.canvasWidth;
    }

    if (this.y < 0) {
      this.y += this.canvasHeight;
    } else if ( this.y > this.canvasHeight) {
      this.y -= this.canvasHeight;
    }

    this.x += this.xVel;
    this.y += this.yVel;
  }
}
