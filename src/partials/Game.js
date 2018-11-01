//import SVG_NS from setting.js
import {
	SVG_NS
} from "../settings";
import Board from "./Board";

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		// Other code goes here...
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);
	}

	// More code goes here... render=drew
	render() {
		this.gameElement.innerHTML = ""; //fix bug on index.js gameloop eg.run console.log 
		let svg = document.createElementNS(SVG_NS, "svg");
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		this.board.render(svg)



	}

}