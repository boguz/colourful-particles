export class Line {
  constructor(ctx, posA, posB, colorA, colorB) {
    this.ctx = ctx;
    this.posA = posA;
    this.posB = posB;
    this.colorA = colorA;
    this.colorB = colorB;
  }

  draw() {
    const grad = this.ctx.createLinearGradient(this.posA.x, this.posA.y, this.posB.x, this.posB.y);
    grad.addColorStop(0, this.colorA);
    grad.addColorStop(1, this.colorB);


    this.ctx.beginPath();
    this.ctx.moveTo(this.posA.x, this.posA.y);
    this.ctx.lineTo(this.posB.x, this.posB.y);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = grad;
    this.ctx.stroke();
  }
}
