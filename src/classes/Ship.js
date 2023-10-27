class Ship {
    constructor(name, length, orientation = 'horizontal') {
        if (typeof name !== 'string') {
            throw new Error('Ship name (title) must be a string');
        }
        if (!Number.isInteger(length) || length <= 0) {
            throw new Error('Ship length must be a positive integer');
        }
        if (!['horizontal', 'vertical'].includes(orientation)) {
            throw new Error('Invalid orientation');
        }
        this.name = name;
        this.length = length;
        this.orientation = orientation; // New property for orientation
        this.hits = Array(length).fill(false);
    }

    hit(position) {
        if (!Number.isInteger(position) || position < 0 || position >= this.length) {
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

    isHit(position) {
        if (position < 0 || position >= this.length) {
            throw new Error('Invalid hit position');
        }
        return this.hits[position];
    }
}

export default Ship;
