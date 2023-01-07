export class Particle {
    constructor(mousePosX, mousePosY) {
        this.x = mousePosX;
        this.y = mousePosY;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > .2) {
            this.size -= .1;
        }
    }
}