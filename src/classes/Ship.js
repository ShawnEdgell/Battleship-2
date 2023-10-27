class Ship {
    constructor(name, length) {
        if (typeof name !== 'string') {
            throw new Error('Ship name (title) must be a string');
        }

        this.name = name;
        this.length = length;
        this.hits = new Array(this.length).fill(false);
    }

    hit(position) {
        if (position < 0 || position >= this.length) {
            throw new Error('Invalid hit position');
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
