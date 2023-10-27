class Ship {
  constructor(type, direction = 'horizontal') {
    const shipTypes = {
      Carrier: 5,
      Battleship: 4,
      Cruiser: 3,
      Submarine: 3,
      Destroyer: 2
    };

    if (!shipTypes[type]) {
      throw new Error('Invalid ship type');
    }

    if (!['horizontal', 'vertical'].includes(direction)) {
      throw new Error('Invalid direction');
    }

    this._type = type;
    this._length = shipTypes[type];
    this._hits = 0;
    this._direction = direction;
  }

  hit() {
    if (this._hits < this._length) {
      this._hits += 1;
    }
  }

  isSunk() {
    return this._hits >= this._length;
  }

  reset() {
    this._hits = 0;
  }

  get length() {
    return this._length;
  }

  get hits() {
    return this._hits;
  }

  get direction() {
    return this._direction;
  }
}

export { Ship };
