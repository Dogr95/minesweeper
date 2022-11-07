import * as p5 from 'p5';
import { Space } from './space';

export class Grid {
    array: Array<Array<Space>> = [];
    isRevealed = false;
    numOfFlags = 0;
    gameover = false;

    constructor(public sizeX: number, public sizeY: number, public mineAmount: number) {
        if(mineAmount > sizeX*sizeY) {
            alert("Invalid number of mines! (Exceeding possible fields!)")
            return
        };
        for(let i = 0; i < sizeX; i++) {
            this.array[i] = [];
            for(let j = 0; j < sizeY; j++) {
                this.array[i][j] = new Space(i, j, this.array);
            }
        }

        this.placeMines(mineAmount);
    }

    private placeMines(amount: number) {
        for(let i = 0; i < amount; i++) {
            let placed = false;
            while(!placed) {
                let randomX = Math.floor(this.sizeX * Math.random())
                let randomY = Math.floor(this.sizeY * Math.random())
                if(!this.array[randomX][randomY].isMine) {
                    placed = true;
                    this.array[randomX][randomY].isMine = true;
                }
            }
        }
    }

    private revealAll() {
        for(let i = 0; i < this.array.length; i++) {
            for(let j = 0; j < this.array[i].length; j++) {
                this.array[i][j].isRevealed = true;
            }
        }
    }

    handleMouse(p: p5, x: number, y: number, spacing: number, button: number) {
        if(this.gameover) return;
        let newX = Math.floor(x/spacing), newY = Math.floor(y/spacing);
        console.log(newX, newY)
        if(newX >= 0 && newY >= 0 && newX < this.array.length && newY < this.array[newX].length) {
            console.log("got space")
            const space = this.array[newX][newY];
            switch(button) {
                case 0: { // LEFT CLICK
                    space.isRevealed = true;
                    if(space.isMine) {
                        this.gameOver();
                    } else if(space.numberOfNeighbours === 0) {
                        space.revealNeighbours();
                    }
                    break;
                }
                case 1: {
                    if(!space.isRevealed) {
                        space.isFlagged = !space.isFlagged;
                        if(space.isFlagged) {
                            this.numOfFlags++;
                        } else {
                            this.numOfFlags--;
                        }
                    }
                    break;
                }
            }

            this.update(p, spacing)
        }
    }

    gameOver() {
        this.gameover = true;
        this.revealAll();
        alert("You lost!")
    }

    checkForWin(): boolean {
        let numOfUnflaggedMines = this.mineAmount;
        for(let i = 0; i < this.array.length; i++) {
            for(let j = 0; j < this.array[i].length; j++) {
                const space = this.array[i][j];
                if(space.isMine && space.isFlagged) {
                    numOfUnflaggedMines--;
                } else if(!space.isMine && !space.isRevealed) {
                    return false;
                }
            }
        }

        console.log(numOfUnflaggedMines);
        return (numOfUnflaggedMines === 0);
    }
    
    update(p: p5, spacing: number) {
        if(this.numOfFlags === this.mineAmount) {
            if(this.checkForWin()) {
                this.gameover = true;
                console.log("You won!")
                alert("You won!")
            }
        }
        document.getElementById("#minecount").innerHTML = `Mines remaining: ${this.mineAmount - this.numOfFlags}`;
        console.log(this.numOfFlags - this.mineAmount, "mines remaining");
        p.textSize(40)
        for(let i = 0; i < this.array.length; i++) {
            for(let j = 0; j < this.array[i].length; j++) {
                const currentSpace = this.array[i][j];

                if(i === 0) {
                    p.push()
                    p.fill(255,0,0)
                    p.rect(0, j*spacing, spacing)
                    p.pop()
                }

                p.push()
                if(currentSpace.isRevealed) {
                    p.fill(200)
                } else {
                    p.fill(255)
                }
                p.rect(i*spacing, j*spacing, spacing);
                p.pop()

                if(currentSpace.isFlagged) {
                    p.push()
                    p.fill(0)
                    p.text("🏁", i*spacing+spacing/4, j*spacing+spacing-15)
                    p.pop()
                }

                if(!currentSpace.isMine && currentSpace.isRevealed) {
                    const mines = currentSpace.numberOfNeighbours;
                    if(mines > 0) {
                        p.push()
                        p.fill(0)
                        p.text(mines, i*spacing+spacing/4, j*spacing+spacing-15);
                        p.pop()
                    }
                } else if(currentSpace.isMine && currentSpace.isRevealed) {
                    p.push()
                    p.fill(0)
                    p.text("ø", i*spacing+spacing/4, j*spacing+spacing-15);
                    p.pop()
                }
            }
        }
    }
}