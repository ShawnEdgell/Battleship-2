import Ship from './Ship';

class Gameboard {
    constructor(rows = 10, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
        this.missedAttacks = [];
    }

    placeShip(name, length, x, y, orientation = 'horizontal') {
        // Check for valid orientation
        if (!['horizontal', 'vertical'].includes(orientation)) {
            throw new Error('Invalid orientation');
        }
    
        // Initialize the ship with the provided orientation
        const ship = new Ship(name, length, orientation);
    
        if (orientation === 'horizontal') {
            // Check for potential overlap and out of bounds
            for (let i = 0; i < ship.length; i++) {
                if (this.isOutOfBounds(x, y + i) || this.grid[x][y + i] !== null) {
                    throw new Error('Invalid ship placement');
                }
            }
            // Place the ship
            for (let i = 0; i < ship.length; i++) {
                this.grid[x][y + i] = ship;
            }
        } else {
            // Check for potential overlap and out of bounds
            for (let i = 0; i < ship.length; i++) {
                if (this.isOutOfBounds(x + i, y) || this.grid[x + i][y] !== null) {
                    throw new Error('Invalid ship placement');
                }
            }
            // Place the ship
            for (let i = 0; i < ship.length; i++) {
                this.grid[x + i][y] = ship;
            }
        }
    }
    

    isOutOfBounds(row, col) {
        return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
    }

    receiveAttack(row, col) {
        if (this.isOutOfBounds(row, col)) {
            throw new Error('Invalid attack coordinates');
        }

        const ship = this.grid[row][col];
        if (ship instanceof Ship) {
            const shipStartRow = this.grid.findIndex((r) => r.includes(ship));
            const shipStartCol = this.grid[shipStartRow].indexOf(ship);

            const hitPosition = ship.orientation === 'horizontal'
                ? col - shipStartCol
                : row - shipStartRow;
            try {
                ship.hit(hitPosition);
            } catch (error) {
                if (error.message === 'Position already hit') {
                    return;
                }
                throw error;
            }
        } else {
            this.missedAttacks.push([row, col].toString());
        }
    }

    areAllShipsSunk() {
        const checkedShips = new Set();
    
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const ship = this.grid[row][col];
    
                if (ship && !checkedShips.has(ship)) {
                    checkedShips.add(ship);
    
                    // Debugging: Log the ship and its sunk status
                    console.log(ship.name, ship.isSunk());
    
                    if (!ship.isSunk()) {
                        return false;
                    }
                }
            }
        }
    
        return true;
    }
    

    getShipAt(row, col) {
        if (this.grid[row][col] instanceof Ship) {
            return this.grid[row][col];
        }
        return null;
    }
}

export default Gameboard;
