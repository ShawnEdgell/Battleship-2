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
        it('should throw an error for invalid ship name', () => {
            expect(() => new Ship('Test Ship', 4)).toThrow('Invalid ship name: Test Ship. Must be one of: Aircraft Carrier, Battleship, Cruiser, Submarine, Destroyer');
        });

        it('should throw an error if ship name is empty', () => {
            expect(() => new Ship('', 4)).toThrow('Invalid ship name: . Must be one of: Aircraft Carrier, Battleship, Cruiser, Submarine, Destroyer');
        });
    });

    // Test hitting the Ship
    describe('hit', () => {
        it('should register a hit at the specified position', () => {
            const ship = new Ship('Battleship', 4);
            ship.hit(1);
            expect(ship.isSunk()).toBe(false);
        });

        it('should throw an error if hit position is out of bounds', () => {
            const ship = new Ship('Battleship', 4);
            expect(() => ship.hit(-1)).toThrow('Invalid hit position');
            expect(() => ship.hit(4)).toThrow('Invalid hit position');
        });

        it('should throw an error if position is already hit', () => {
            const ship = new Ship('Battleship', 4);
            ship.hit(1);
            expect(() => ship.hit(1)).toThrow('Position already hit');
        });
    });

    // Test checking if a position of the Ship has been hit
    describe('isHit', () => {
        it('should return true if a position has been hit', () => {
            const ship = new Ship('Battleship', 4);
            ship.hit(1);
            expect(ship.isHit(1)).toBe(true);
        });

        it('should return false if a position has not been hit', () => {
            const ship = new Ship('Battleship', 4);
            expect(ship.isHit(0)).toBe(false);
        });

        it('should throw an error if checking an out-of-bounds position', () => {
            const ship = new Ship('Battleship', 4);
            expect(() => ship.isHit(-1)).toThrow('Invalid position checked');
            expect(() => ship.isHit(4)).toThrow('Invalid position checked');
        });
    });

    // Test if Ship is sunk
    describe('isSunk', () => {
        it('should return false if not all positions have been hit', () => {
            const ship = new Ship('Battleship', 4);
            expect(ship.isSunk()).toBe(false);
            ship.hit(1);
            expect(ship.isSunk()).toBe(false);
        });

        it('should return true if all positions have been hit', () => {
            const ship = new Ship('Battleship', 4);
            hitShipMultipleTimes(ship, 4);
            expect(ship.isSunk()).toBe(true);
        });
    });

    // Test for classic Battleship ship names and lengths
    describe('Classic Battleship Ships', () => {
        it('should create an Aircraft Carrier of length 5', () => {
            const aircraftCarrier = new Ship('Aircraft Carrier', 5);
            expect(aircraftCarrier.getSize()).toBe(5);
        });

        it('should throw an error if Aircraft Carrier is not of length 5', () => {
            expect(() => new Ship('Aircraft Carrier', 4)).toThrow('Invalid size for Aircraft Carrier. Expected 5.');
        });

        it('should create a Battleship of length 4', () => {
            const battleship = new Ship('Battleship', 4);
            expect(battleship.getSize()).toBe(4);
        });

        it('should throw an error if Battleship is not of length 4', () => {
            expect(() => new Ship('Battleship', 5)).toThrow('Invalid size for Battleship. Expected 4.');
        });

        it('should create a Cruiser of length 3', () => {
            const cruiser = new Ship('Cruiser', 3);
            expect(cruiser.getSize()).toBe(3);
        });

        it('should throw an error if Cruiser is not of length 3', () => {
            expect(() => new Ship('Cruiser', 2)).toThrow('Invalid size for Cruiser. Expected 3.');
        });

        it('should create a Submarine of length 3', () => {
            const submarine = new Ship('Submarine', 3);
            expect(submarine.getSize()).toBe(3);
        });

        it('should throw an error if Submarine is not of length 3', () => {
            expect(() => new Ship('Submarine', 4)).toThrow('Invalid size for Submarine. Expected 3.');
        });

        it('should create a Destroyer of length 2', () => {
            const destroyer = new Ship('Destroyer', 2);
            expect(destroyer.getSize()).toBe(2);
        });

        it('should throw an error if Destroyer is not of length 2', () => {
            expect(() => new Ship('Destroyer', 3)).toThrow('Invalid size for Destroyer. Expected 2.');
        });
    });

    describe('Initial State of Ship', () => {
        it('should have no positions hit initially', () => {
            const ship = new Ship('Battleship', 4);
            for (let i = 0; i < ship.getSize(); i++) {
                expect(ship.isHit(i)).toBe(false);
            }
        });
    });

    describe('Hitting Ship at Non-Sequential Positions', () => {
        it('should not be sunk if only hit at non-sequential positions', () => {
            const ship = new Ship('Battleship', 4);
            
            ship.hit(0);
            ship.hit(2);
            
            expect(ship.isSunk()).toBe(false);
        });
    
        it('should be sunk if all positions are hit, even non-sequentially', () => {
            const ship = new Ship('Battleship', 4);
            
            ship.hit(3);
            ship.hit(1);
            ship.hit(0);
            ship.hit(2);
            
            expect(ship.isSunk()).toBe(true);
        });
    });
    
});
