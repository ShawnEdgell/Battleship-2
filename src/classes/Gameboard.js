import Ship from './Ship'; // Assuming the Ship class is in the same directory

class Gameboard {
    constructor() {
        this.boardSize = 10; // for a 10x10 board
        this.board = new Array(this.boardSize * this.boardSize).fill(null);
        this.missedShots = [];
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
            const orientation = this.getShipOrientation(ship); // You'll need to implement this method.
            
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
        } else {
            if (this.missedShots.includes(position)) {
                throw new Error('Position already attacked');
            }
            this.missedShots.push(position);
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

