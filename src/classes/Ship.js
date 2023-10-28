class Ship {
    constructor(name, size) {
        if (typeof name !== 'string') {
            throw new Error('Ship name (title) must be a string');
        }
        if (name.length === 0) {
            throw new Error('Ship name (title) must not be empty');
        }
        if (!Number.isInteger(size) || size <= 0) {
            throw new Error('Invalid ship size');
        }
        this.name = name;
        this.size = size;
        this.hits = new Array(size).fill(false);
    }

    isPositionHit(position) {
        return this.hits[position] === true;
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