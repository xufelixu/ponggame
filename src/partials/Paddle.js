import {
    SVG_NS
} from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down, player) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.score = 0;

        this.keyUP = up;
        this.keyDown = down;
        this.player = player;

        this.keyState = {};
        document.addEventListener('keydown', event => {
            this.keyState[event.key || event.which] = true;
        }, true);
        document.addEventListener('keyup', event => {
            this.keyState[event.key || event.which] = false;
        }, true);

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
    }
    //constructor


    up() {

        //this.y = Math.max(this.y, 0);
        this.y = Math.max(0, [this.y - this.speed]);
        this.y -= this.speed;

    }

    down() {

        //this.y = Math.min(this.y, 256 - this.height);
        this.y = Math.min([this.boardHeight - this.height], [this.y + this.speed]);
        this.y += this.speed;

    }


    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }
    //coordinates 

    render(svg) {

        if (this.keyState[this.keyup] && this.player === "player1") {
            this.up();
        }
        if (this.keyState[this.keydown] && this.player === "player1") {
            this.down();
        }
        if (this.keyState[this.keyup] && this.player === "player2") {
            this.up();
        }
        if (this.keyState[this.keydown] && this.player === "player2") {
            this.down();
        }

        let rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttributeNS(null, 'width', this.width);
        rect.setAttributeNS(null, 'height', this.height);
        rect.setAttributeNS(null, 'fill', 'white');
        rect.setAttributeNS(null, 'x', this.x); //x of the top left corner
        rect.setAttributeNS(null, 'y', this.y); //y of the top left corner
        svg.appendChild(rect);

    }

}