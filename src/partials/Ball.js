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
        this.ping = new Audio("public/sounds/pong-01.wav");
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

    paddleCollision(player1, player2) {
        if (this.vx > 0) {
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
            let [leftX, rightX, topY, bottomY] = paddle;

            if (
                (this.x + this.radius >= leftX) &&
                (this.x + this.radius <= rightX) &&
                (this.y >= topY && this.y <= bottomY)

            ) {

                this.vx *= -1; //this.vx= -this.vx
                this.ping.play();
            }
        } else {
            //Detect collision on left side (player1)//experimnet with diff values to improve collision detection
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
            let [leftX, rightX, topY, bottomY] = paddle;
            if (
                //detect collision on left
                (this.x - this.radius <= rightX) &&
                (this.x - this.radius >= leftX) &&
                (this.y >= topY && this.y <= bottomY)
            ) {
                this.vx = -this.vx;

                this.ping.play();
            }
        }

    }

    goal(player) {
        player.score++
        this.reset();
        console.log(player.score); //which player and using ++
    }

    render(svg, player1, player2) {

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;

        if (rightGoal) {
            this.goal(player1)
            this.direction = 1;
        } else if (leftGoal) {
            this.goal(player2);
            this.direction = -1;
        }
        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;
        this.wallCollision();
        this.paddleCollision(player1, player2);

        //drew ball
        let circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x); // x of the centre point
        circle.setAttributeNS(null, 'cy', this.y); // y of the centre point
        circle.setAttributeNS(null, 'fill', "white");
        svg.appendChild(circle);

    }
}