import Ship from '../src/classes/Ship';

// Helper function to quickly hit a ship multiple times
function hitShipMultipleTimes(ship, times) {
    for (let i = 0; i < times; i++) {
        ship.hit(i);
    }
}

describe('Ship', () => {
    // Test Ship construction
    describe('Initialization', () => {
        it('should create a ship with the given name and size', () => {
            const ship = new Ship('Test Ship', 4);
            expect(ship.getName()).toBe('Test Ship');
            expect(ship.getSize()).toBe(4);
        });

        it('should throw an error for invalid name type', () => {
            expect(() => new Ship(123, 4)).toThrow('Ship name (title) must be a string');
        });

        it('should throw an error for non-integer or negative size', () => {
            expect(() => new Ship('Test Ship', '4')).toThrow('Invalid ship size');
            expect(() => new Ship('Test Ship', -4)).toThrow('Invalid ship size');
        });

        it('should throw an error if ship size is zero', () => {
            expect(() => new Ship('Test Ship', 0)).toThrow('Invalid ship size');
        });

        it('should throw an error if ship name is empty', () => {
            expect(() => new Ship('', 4)).toThrow('Ship name (title) must not be empty');
        });
    });

    // Test hitting the Ship
    describe('hit', () => {
        it('should register a hit at the specified position', () => {
            const ship = new Ship('Test Ship', 3);
            ship.hit(1);
            expect(ship.isSunk()).toBe(false);
        });

        it('should register a hit at the first and last position of the ship', () => {
            const ship = new Ship('Test Ship', 5);
            ship.hit(0);
            ship.hit(4);
            expect(ship.isSunk()).toBe(false);
        });

        it('should throw an error if hit position is out of bounds', () => {
            const ship = new Ship('Test Ship', 3);
            expect(() => ship.hit(-1)).toThrow('Invalid hit position');
            expect(() => ship.hit(3)).toThrow('Invalid hit position');
        });

        it('should throw an error if position is already hit', () => {
            const ship = new Ship('Test Ship', 3);
            ship.hit(1);
            expect(() => ship.hit(1)).toThrow('Position already hit');
        });
    });

    // Test checking if a position of the Ship has been hit
    describe('isHit', () => {
        it('should return true if a position has been hit', () => {
            const ship = new Ship('Test Ship', 3);
            ship.hit(1);
            expect(ship.isHit(1)).toBe(true);
        });

        it('should return false if a position has not been hit', () => {
            const ship = new Ship('Test Ship', 3);
            expect(ship.isHit(0)).toBe(false);
        });

        it('should throw an error if checking an out-of-bounds position', () => {
            const ship = new Ship('Test Ship', 3);
            expect(() => ship.isHit(-1)).toThrow('Invalid position checked');
            expect(() => ship.isHit(3)).toThrow('Invalid position checked');
        });
    });

    // Test if Ship is sunk
    describe('isSunk', () => {
        it('should return false if not all positions have been hit', () => {
            const ship = new Ship('Test Ship', 3);
            expect(ship.isSunk()).toBe(false);
            ship.hit(1);
            expect(ship.isSunk()).toBe(false);
        });

        it('should return true if all positions have been hit', () => {
            const ship = new Ship('Test Ship', 3);
            hitShipMultipleTimes(ship, 3);
            expect(ship.isSunk()).toBe(true);
        });
    });

    // Test for classic Battleship ship names and lengths
    describe('Classic Battleship Ships', () => {
        it('should create an Aircraft Carrier of length 5', () => {
            const aircraftCarrier = new Ship('Aircraft Carrier', 5);
            expect(aircraftCarrier.getSize()).toBe(5);
        });

        it('should create a Battleship of length 4', () => {
            const battleship = new Ship('Battleship', 4);
            expect(battleship.getSize()).toBe(4);
        });

        it('should create a Cruiser of length 3', () => {
            const cruiser = new Ship('Cruiser', 3);
            expect(cruiser.getSize()).toBe(3);
        });

        it('should create a Submarine of length 3', () => {
            const submarine = new Ship('Submarine', 3);
            expect(submarine.getSize()).toBe(3);
        });

        it('should create a Destroyer of length 2', () => {
            const destroyer = new Ship('Destroyer', 2);
            expect(destroyer.getSize()).toBe(2);
        });
    });
});
