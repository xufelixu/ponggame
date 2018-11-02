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
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
    }

    //ball reset 

    render(svg) {
        //drew ball
        let circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttributeNS(null, 'r', this.radius);
        circle.setAttributeNS(null, 'cx', this.x / 2); // x of the centre point
        circle.setAttributeNS(null, 'cy', this.y / 2); // y of the centre point
        circle.setAttributeNS(null, 'fill', "white");
        svg.appendChild(circle);

    }



}