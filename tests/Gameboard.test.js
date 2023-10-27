import Gameboard from '../src/classes/Gameboard';
import Ship from '../src/classes/Ship';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    it('should initialize properly', () => {
        expect(gameboard.grid.length).toBe(10);
        expect(gameboard.grid[0].length).toBe(10);
    });

    it('should place ships correctly', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);
        expect(gameboard.getShipAt(0, 0)).toBeInstanceOf(Ship);
        expect(gameboard.getShipAt(0, 0).name).toBe('Carrier');
    });

    it('should throw error for placing ships outside the boundaries', () => {
        expect(() => gameboard.placeShip('Carrier', 5, 10, 10)).toThrow('Invalid ship placement');
        expect(() => gameboard.placeShip('Carrier', 5, -1, -1)).toThrow('Invalid ship placement');
    });

    it('should throw error for overlapping ships', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);
        expect(() => gameboard.placeShip('Destroyer', 2, 0, 0)).toThrow('Invalid ship placement');
    });

    it('should throw error for invalid orientation', () => {
        expect(() => gameboard.placeShip('Carrier', 5, 0, 0, 'diagonal')).toThrow();
    });

    it('should register hits correctly', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);
        gameboard.receiveAttack(0, 0);
        expect(gameboard.getShipAt(0, 0).isHit(0)).toBeTruthy();
    });

    it('should throw error for attacks outside boundaries', () => {
        expect(() => gameboard.receiveAttack(10, 10)).toThrow('Invalid attack coordinates');
        expect(() => gameboard.receiveAttack(-1, -1)).toThrow('Invalid attack coordinates');
    });

    it('should register hits on the same position only once', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 0);
        // Ensure the ship's hit array has only one true value at position 0
        expect(gameboard.getShipAt(0, 0).hits[0]).toBe(true);
    });

    it('should register misses correctly', () => {
        gameboard.receiveAttack(9, 9);
        expect(gameboard.missedAttacks.includes('9,9')).toBeTruthy();
    });

    it('should check if all ships are sunk', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);

        // Debugging: Log the gameboard grid before attacks
        console.log('Initial Gameboard:');
        console.log(gameboard.grid.map(row => row.map(cell => cell ? cell.name : null)));

        for (let i = 0; i < 5; i++) {
            gameboard.receiveAttack(0, i);
        }

        // Debugging: Log the gameboard grid after attacks
        console.log('Gameboard After Attacks:');
        console.log(gameboard.grid.map(row => row.map(cell => cell ? cell.name : null)));

        // Debugging: Check if the ship is sunk
        const ship = gameboard.getShipAt(0, 0);
        console.log('Is ship sunk? :', ship.isSunk());  // Should be true

        expect(gameboard.areAllShipsSunk()).toBeTruthy();
    });
});
