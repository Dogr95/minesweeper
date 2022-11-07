import * as p5 from 'p5';
import { Grid } from './grid';

const width = 35;
const height = 15;
const spacing = 48;
const numberOfMines = 35;
let grid: Grid;

document.addEventListener('contextmenu', event => event.preventDefault());

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(width*spacing+1, height*spacing+1);
        p.background(200);
        grid = new Grid(width, height, numberOfMines);
        grid.update(p, spacing)
    }

    p.draw = () => {
    }

    p.mousePressed = () => {
        let button: number;
        switch(p.mouseButton) {
            case p.LEFT:
                button = 0
                break;
            case p.RIGHT:
                button = 1;
                break;
            default:
                return;
        }
        grid.handleMouse(p, p.mouseX, p.mouseY, spacing, button)
    }

    
}

export const myp5 = new p5(sketch, document.body);
