import {
    SVG_NS
} from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;



        document.addEventListener("keydown", event => {
            switch (event.key) {
                case up:
                    this.up();

                    break;
                case down:
                    this.down()
                    break;
            }
        });
    } //constructor


    up() {

        this.y = Math.max(this.y, 0);
        //this.y =Math.max (0,[this.y-this.speed]);
        this.y -= this.speed;

    }

    down() {

        this.y = Math.min(this.y, 256 - this.height);
        //this.y=Math.min([this.boardHeight -this.height],[this.y+this.speed]);
        this.y += this.speed;

    }

    render(svg) {

        let rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'x', this.x); //x of the top left corner
        rect.setAttributeNS(null, 'y', this.y); //y of the top left corner
        svg.appendChild(rect);

    }

}