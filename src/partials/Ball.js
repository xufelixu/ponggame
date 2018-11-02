// Ball.js

import {
    SVG_NS
} from '../settings';

export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;
        this.reset();
    }

    reset() {


        this.ax = -0.01;
        this.ay = 0.01;



        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 0;
        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);

        }

        this.vx = this.direction * (6 - Math.abs(this.vy)); //this.direction is to reset the direction 

    }

    //ball reset 

    wallCollision() {
        const hitLeft = this.x - this.radius <= 0;
        const hitRight = this.x + this.radius >= this.boardWidth;
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitRight) {
            this.vx *= -1;
        } else if (hitLeft) {
            this.vx *= -1;
        } else if (hitTop) {
            this.vy *= -1;
        } else if (hitBottom) {
            this.vy *= -1;
        }




    }

    render(svg) {

        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;
        this.wallCollision();


        //drew ball
        let circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x); // x of the centre point
        circle.setAttributeNS(null, 'cy', this.y); // y of the centre point
        circle.setAttributeNS(null, 'fill', "white");
        svg.appendChild(circle);

    }
}