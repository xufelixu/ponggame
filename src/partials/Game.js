//import SVG_NS from setting.js
import {
	SVG_NS,
	KEYS
} from "../settings";
import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;


		// Other code goes here...
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);



		// Paddle 
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		// Ball
		this.radius = 8;
		this.boardHeight = 256;
		this.boardWidth = 128;

		//Player 1
		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z
		)

		//Player 2
		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
		)

		this.ball = new Ball(8, this.width, this.height);
		//end of constructor 



		document.addEventListener("keydown", event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});


	}




	// More code goes here... render=drew
	render() {

		if (this.pause) {


			return;


		}


		this.gameElement.innerHTML = ""; //fix bug on index.js gameloop eg.run console.log 
		let svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg);

	}

}