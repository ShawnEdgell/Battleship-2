import Ship from './Ship'; // Adjust the path accordingly

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        this.ships = [];
        this.missedAttacks = [];
        this.attackedPositions = [];
    }

    // Returns the placed ships
    getShips() {
        return this.ships;
    }

    placeShip(name, startCoords, orientation) {
        const ship = new Ship(name, Ship.SHIP_DETAILS[name]);

        // Calculate the positions based on orientation
        let positions = [];
        for (let i = 0; i < ship.getSize(); i++) {
            if (orientation === 'horizontal') {
                positions.push([startCoords[0], startCoords[1] + i]);
            } else if (orientation === 'vertical') {
                positions.push([startCoords[0] + i, startCoords[1]]);
            }
        }

        // Check for board boundaries
        if (positions.some(pos => pos[0] >= this.size || pos[1] >= this.size)) {
            throw new Error('Ship goes out of board boundaries');
        }

        // Check for collisions with other ships
        for (const existingShip of this.ships) {
            for (const position of existingShip.positions) {
                if (positions.some(pos => pos[0] === position[0] && pos[1] === position[1])) {
                    throw new Error('Ships overlap!');
                }
            }
        }

        // Associate the positions with the ship
        ship.positions = positions;
        this.ships.push(ship);
    }

    receiveAttack(coords) {
        let hitRegistered = false;
    
        // Check for repeated attacks
        if (this.attackedPositions.some(pos => pos[0] === coords[0] && pos[1] === coords[1])) {
            throw new Error('Position was already attacked');
        }
        this.attackedPositions.push(coords);
    
        for (const ship of this.ships) {
            for (let i = 0; i < ship.positions.length; i++) {
                if (ship.positions[i][0] === coords[0] && ship.positions[i][1] === coords[1]) {
                    ship.hit(i);
                    hitRegistered = true;
                    break;
                }
            }
            if (hitRegistered) break;  // This ensures we exit the outer loop once a hit is registered
        }
    
        if (!hitRegistered) {
            this.missedAttacks.push(coords);
        }
    }

     // Return the missed attacks
     getMissedAttacks() {
        return this.missedAttacks;
    }

    // Check if all ships are sunk
    areAllShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
    

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}

export default Gameboard;
