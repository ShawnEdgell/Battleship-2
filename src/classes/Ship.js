class Ship {
    static SHIP_DETAILS = {
        'Aircraft Carrier': 5,
        'Battleship': 4,
        'Cruiser': 3,
        'Submarine': 3,
        'Destroyer': 2
    };

    constructor(name, size) {
        if (!Ship.SHIP_DETAILS[name]) {
            throw new Error(`Invalid ship name: ${name}. Must be one of: ${Object.keys(Ship.SHIP_DETAILS).join(', ')}`);
        }
        if (Ship.SHIP_DETAILS[name] !== size) {
            throw new Error(`Invalid size for ${name}. Expected ${Ship.SHIP_DETAILS[name]}.`);
        }
        this.name = name;
        this.size = size;
        this.hits = new Array(size).fill(false);
        this.positions = [];
    }

    getName() {
        return this.name;
    }

    getSize() {
        return this.size;
    }

    isHit(position) {
        if (position < 0 || position >= this.size) {
            throw new Error('Invalid position checked');
        }
        return this.hits[position];
    }

    hit(position) {
        if (position < 0 || position >= this.size) {
            throw new Error('Invalid hit position');
        }
        if (this.hits[position]) {
            throw new Error('Position already hit');
        }
        this.hits[position] = true;
    }

    isSunk() {
        return this.hits.every(hit => hit);
    }
}

export default Ship;
