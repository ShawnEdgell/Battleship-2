import Ship from '../src/classes/Ship';

describe('Ship', () => {
    const SHIPS_DATA = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Cruiser', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Destroyer', length: 2 },
    ];

    SHIPS_DATA.forEach(shipData => {
        describe(shipData.name, () => {
            it('should initialize properly', () => {
                const ship = new Ship(shipData.name, shipData.length);
                expect(ship.name).toBe(shipData.name);
                expect(ship.length).toBe(shipData.length);
                expect(ship.hits).toEqual(new Array(shipData.length).fill(false));
            });

            it('should throw error for non-integer or invalid lengths', () => {
                expect(() => new Ship(shipData.name, -1)).toThrow();
                expect(() => new Ship(shipData.name, 0)).toThrow();
                expect(() => new Ship(shipData.name, "three")).toThrow();
            });

            it('should register hits correctly', () => {
                const ship = new Ship(shipData.name, shipData.length);
                ship.hit(0);
                expect(ship.hits[0]).toBe(true);
            });

            it('should throw error for hitting the same position multiple times', () => {
                const ship = new Ship(shipData.name, shipData.length);
                ship.hit(0);
                expect(() => ship.hit(0)).toThrow('Position already hit');
            });

            it('should throw error for invalid hit position', () => {
                const ship = new Ship(shipData.name, shipData.length);
                expect(() => ship.hit(-1)).toThrow('Invalid hit position');
                expect(() => ship.hit(shipData.length)).toThrow('Invalid hit position');
            });

            it('should check if ship is sunk', () => {
                const ship = new Ship(shipData.name, shipData.length);
                expect(ship.isSunk()).toBe(false);
                
                for (let i = 0; i < shipData.length; i++) {
                    ship.hit(i);
                }
                expect(ship.isSunk()).toBe(true);
            });
        });
    });

    it('should throw an error if ship name is not a string', () => {
        expect(() => new Ship(12345, 3)).toThrow('Ship name (title) must be a string');
    });
});
