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

    it('should register hits correctly', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);
        gameboard.receiveAttack(0, 0);
        expect(gameboard.getShipAt(0, 0).isHit(0)).toBeTruthy();
    });

    it('should register misses correctly', () => {
        gameboard.receiveAttack(9, 9);
        expect(gameboard.missedAttacks.includes('9,9')).toBeTruthy();
    });

    it('should check if all ships are sunk', () => {
        gameboard.placeShip('Carrier', 5, 0, 0);
        for (let i = 0; i < 5; i++) {
            gameboard.receiveAttack(0, i);
        }
        expect(gameboard.areAllShipsSunk()).toBeTruthy();
    });
    
    // ... Additional tests can be added for further coverage, like verifying invalid placements, etc.
});
