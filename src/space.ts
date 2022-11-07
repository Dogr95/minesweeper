export class Space {
    isMine = false;
    isRevealed = false;
    isFlagged = false;
    initialized = false;
    neighbourCache: number;

    constructor(public x: number, public y: number, public array: Array<Array<Space>>) {
    }

    get numberOfNeighbours(): number {
        if(this.initialized) {
            return this.neighbourCache;
        } else {
            this.neighbourCache = this.countNeighbours();
            return this.neighbourCache;
        }
    }

    public revealNeighbours() {
        if(
            this.x > 0 && this.y > 0 &&
            this.x < this.array.length - 1 &&
            this.y < this.array[0].length - 1
        ) {
            let count = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x === 0 && this.y > 0 && this.y < this.array[0].length - 1) {
            
            let count = 0;
            for(let i = 0; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x > 0 && this.x < this.array.length - 1 && this.y === 0) {
            let count = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = 0; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x === 0 && this.y === 0) {
            // Othis.x
            // this.xthis.x
            let count = 0;
            for(let i = 0; i < 2; i++) {
                for(let j = 0; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x === this.array.length - 1 && this.y === 0) {
            let count = 0;
            for(let i = -1; i < 1; i++) {
                for(let j = 0; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x === this.array.length - 1 && this.y > 0 && this.y < this.array[0].length - 1) {
            let count = 0;
            for(let i = -1; i < 1; i++) {
                for(let j = -1; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x > 0 && this.x < this.array.length - 1 && this.y === this.array[0].length - 1) {
            let count = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 1; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } else if(this.x === 0 && this.y === this.array[0].length - 1) {
            let count = 0;
            for(let i = 0; i < 2; i++) {
                for(let j = -1; j < 1; j++) {
                    if(!(i === 0 && j === 0)) {
                        const neighbour = this.array[this.x+i][this.y+j];
                        if(!neighbour.isRevealed) {
                            neighbour.isRevealed = true;
                            if(neighbour.numberOfNeighbours === 0) {
                                neighbour.revealNeighbours();
                            }
                        }
                    }
                }
            }

            return count;
        } 

    }

    private countNeighbours() {
        if(this.initialized) return this.neighbourCache;
        if(
            this.x > 0 && this.y > 0 &&
            this.x < this.array.length - 1 &&
            this.y < this.array[0].length - 1
        ) {
            let count = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x === 0 && this.y > 0 && this.y < this.array[0].length - 1) {
            
            let count = 0;
            for(let i = 0; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x > 0 && this.x < this.array.length - 1 && this.y === 0) {
            let count = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = 0; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x === 0 && this.y === 0) {
            // Othis.x
            // this.xthis.x
            let count = 0;
            for(let i = 0; i < 2; i++) {
                for(let j = 0; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x === this.array.length - 1 && this.y === 0) {
            let count = 0;
            for(let i = -1; i < 1; i++) {
                for(let j = 0; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x === this.array.length - 1 && this.y > 0 && this.y < this.array[0].length - 1) {
            let count = 0;
            for(let i = -1; i < 1; i++) {
                for(let j = -1; j < 2; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x > 0 && this.x < this.array.length - 1 && this.y === this.array[0].length - 1) {
            let count = 0;
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 1; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } else if(this.x === 0 && this.y === this.array[0].length - 1) {
            let count = 0;
            for(let i = 0; i < 2; i++) {
                for(let j = -1; j < 1; j++) {
                    if(!(i === 0 && j === 0)) {
                        if(this.array[this.x+i][this.y+j].isMine) count++;
                    }
                }
            }

            return count;
        } 
    }
}