import Ship from './Ship'; // Assuming the Ship class is in the same directory

class Gameboard {
    constructor() {
        this.boardSize = 10; // for a 10x10 board
        this.board = new Array(this.boardSize * this.boardSize).fill(null);
        this.missedShots = [];
        
        // Initialize required ships
        this.requiredShips = [
            {name: 'Battleship', size: 4},
            {name: 'Cruiser', size: 3},
            {name: 'Submarine', size: 3},
            {name: 'Destroyer', size: 2},
            {name: 'PatrolBoat', size: 2}
        ];
        this.placedShips = [];
    }

    placeShip(ship, position, direction) {
        // Check for valid direction
        if (direction !== 'horizontal' && direction !== 'vertical') {
            throw new Error('Invalid ship direction');
        }

        // Check if the ship can fit without going out of bounds
        if ((direction === 'horizontal' && (position % this.boardSize) + ship.getSize() > this.boardSize) || 
            (direction === 'vertical' && position + (this.boardSize * (ship.getSize() - 1)) >= this.board.length)) {
            throw new Error('Invalid ship placement');
        }

        // Check for overlaps with other ships
        for (let i = 0; i < ship.getSize(); i++) {
            const currentPosition = direction === 'horizontal' ? position + i : position + (i * this.boardSize);
            if (this.board[currentPosition]) {
                throw new Error('Overlap with another ship');
            }
        }

        // Place the ship on the board
        for (let i = 0; i < ship.getSize(); i++) {
            const currentPosition = direction === 'horizontal' ? position + i : position + (i * this.boardSize);
            this.board[currentPosition] = ship;
        }

        // After placing a ship, add it to the placedShips list
        if(!this.placedShips.includes(ship.name)) {
            this.placedShips.push(ship.name);
        }
        
    }

    getShipAt(position) {
        return this.board[position];
    }

    receiveAttack(position) {
        if (position < 0 || position >= this.board.length) {
            throw new Error('Invalid attack position');
        }
    
        const ship = this.getShipAt(position);
        if (ship) {
            const shipStart = this.board.indexOf(ship);
            const orientation = this.getShipOrientation(ship);
    
            let hitPosition;
            if (orientation === 'horizontal') {
                hitPosition = position - shipStart;
            } else if (orientation === 'vertical') {
                const boardWidth = Math.sqrt(this.board.length); // Assuming a square board
                hitPosition = (position - shipStart) / boardWidth;
            } else {
                throw new Error('Unknown ship orientation');
            }
    
            if (ship.isPositionHit(hitPosition)) {
                throw new Error('Position already attacked');
            }
    
            ship.hit(hitPosition);
    
            if(ship.isSunk()) {
                return `You sank my ${ship.name}!`;
            }
            return 'Hit!';
        } else {
            if (this.missedShots.includes(position)) {
                throw new Error('Position already attacked');
            }
    
            this.missedShots.push(position);
            return 'Miss!';
        }
    }

    
    
    
    // Implement this method to determine a ship's orientation.
    getShipOrientation(ship) {
        // If the difference between two occurrences of the same ship on the board is 1, it's horizontal.
        const firstPos = this.board.indexOf(ship);
        const secondPos = this.board.indexOf(ship, firstPos + 1);
        return secondPos - firstPos === 1 ? 'horizontal' : 'vertical';
    }

    areAllShipsSunk() {
        return this.board.filter(spot => spot instanceof Ship).every(ship => ship.isSunk());
    }

    sinkAllShips() {
        const sunkShips = [];
    
        this.board.forEach((spot) => {
            if (spot instanceof Ship && !sunkShips.includes(spot)) {
                for(let i = 0; i < spot.getSize(); i++) {
                    const shipStart = this.board.indexOf(spot);
                    const currentPosition = (this.getShipOrientation(spot) === 'horizontal') 
                        ? shipStart + i 
                        : shipStart + (i * this.boardSize);
    
                    if (!spot.isPositionHit(currentPosition - shipStart)) {
                        spot.hit(currentPosition - shipStart);
                    }
                }
                sunkShips.push(spot);
            }
        });
    }
    
    

    areAllShipsPlaced() {
        return this.requiredShips.every(shipInfo => {
            return this.placedShips.includes(shipInfo.name);
        });
    }

    getMissedShots() {
        return this.missedShots;
    }

    getBoardSize() {
        return this.boardSize * this.boardSize;
    }

    getBoardSnapshot() {
        return this.board.map((spot, index) => {
            if (this.missedShots.includes(index)) return 'missed';
            if (spot && spot.isPositionHit(index - this.board.indexOf(spot))) return 'hit';
            if (spot) return 'ship';
            return null;
        });
    }
}

export default Gameboard; 

