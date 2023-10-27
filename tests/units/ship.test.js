import { Ship } from '../../src/classes/ship.js';

describe('Ship', () => {

  // Initialization Tests
  it('initializes with the correct length and defaults', () => {
    const ship = new Ship('Carrier');
    expect(ship.length).toBe(5);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
  });

  const shipTypes = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3,
    Destroyer: 2
  };

  for (const [type, length] of Object.entries(shipTypes)) {
    it(`initializes ${type} with the correct length`, () => {
      const ship = new Ship(type);
      expect(ship.length).toBe(length);
    });
  }

  it('throws an error if initialized with a non-numeric length', () => {
    expect(() => {
      new Ship('a');
    }).toThrow('Invalid ship type');
  });

  it('throws an error if initialized with a length of 0 or negative', () => {
    expect(() => {
      new Ship('UnknownType');
    }).toThrow('Invalid ship type');
  });

  it('throws an error if initialized with a length greater than 10', () => {
    expect(() => new Ship('SuperCarrier')).toThrow('Invalid ship type');
  });

  // Hit Tests
  describe('hit()', () => {
    it('increases the hit count', () => {
      const ship = new Ship('Cruiser');
      ship.hit();
      expect(ship.hits).toBe(1);
      ship.hit();
      expect(ship.hits).toBe(2);
    });

    it('does not increase hit count beyond ship length', () => {
      const ship = new Ship('Destroyer');
      ship.hit();
      ship.hit();
      expect(ship.hits).toBe(2);
      ship.hit();
      expect(ship.hits).toBe(2);
    });
  });

  // Sinking Tests
  describe('isSunk()', () => {
    it('returns false if hits are less than the ship length', () => {
      const ship = new Ship('Cruiser');
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });

    it('returns true if hits are equal to the ship length', () => {
      const ship = new Ship('Cruiser');
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });

    it('returns true even if hits exceed the ship length', () => {
      const ship = new Ship('Destroyer');
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });

  // Placement (Horizontal and Vertical)
  describe('direction', () => {
    it('can be placed horizontally', () => {
      const ship = new Ship('Destroyer', 'horizontal');
      expect(ship.direction).toBe('horizontal');
    });

    it('can be placed vertically', () => {
      const ship = new Ship('Destroyer', 'vertical');
      expect(ship.direction).toBe('vertical');
    });

    it('throws an error for invalid direction', () => {
      expect(() => new Ship('Destroyer', 'diagonal')).toThrow('Invalid direction');
    });
  });

  // State After Multiple Operations
  it('behaves correctly after a series of hits and resets', () => {
    const ship = new Ship('Cruiser');
    ship.hit();
    ship.hit();
    ship.reset();
    ship.hit();
    expect(ship.hits).toBe(1);
    expect(ship.isSunk()).toBe(false);
  });

  // Optional: Reset Tests (if you have or plan to implement a reset functionality for the ship)
  describe('reset()', () => {
    it('resets hits to 0 and isSunk to false', () => {
      const ship = new Ship('Cruiser');
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.hits).toBe(3);
      expect(ship.isSunk()).toBe(true);
      ship.reset();
      expect(ship.hits).toBe(0);
      expect(ship.isSunk()).toBe(false);
    });
  });

  // Immutability tests
  it('does not allow modification of length', () => {
    const ship = new Ship('Destroyer');
    const initialLength = ship.length;
  
    // Wrap the attempt to modify the property in a function
    const modifyLength = () => {
      ship.length = 10; // This should not change the ship's length
    };
  
    expect(modifyLength).toThrow(); // Expect the function to throw an error
    expect(ship.length).toBe(initialLength);
  });
  
  it('does not allow modification of direction', () => {
    const ship = new Ship('Destroyer', 'horizontal');
    const initialDirection = ship.direction;
  
    // Wrap the attempt to modify the property in a function
    const modifyDirection = () => {
      ship.direction = 'vertical'; // This should not change the ship's direction
    };
  
    expect(modifyDirection).toThrow(); // Expect the function to throw an error
    expect(ship.direction).toBe(initialDirection);
  });
  
});
