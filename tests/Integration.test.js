import Gameboard from '../src/classes/Gameboard';

describe('Integration between Gameboard and Ship', () => {

    test('hitting a ship on the gameboard updates the ship\'s hit state', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip('Carrier', 5, 0, 0);
        gameboard.receiveAttack(0, 0);
        const ship = gameboard.getShipAt(0, 0);
        expect(ship.isHit(0)).toBe(true);
    });

    test('missing a ship on the gameboard does not affect any ship', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip('Carrier', 5, 0, 0);
        gameboard.receiveAttack(1, 0);
        expect(gameboard.missedAttacks).toContain('1,0');
    });

    test('sinking a ship updates its sunk status', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip('Destroyer', 2, 0, 0);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        const ship = gameboard.getShipAt(0, 0);
        expect(ship.isSunk()).toBe(true);
    });

    test('sinking all ships on the gameboard results in game over', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip('Destroyer', 2, 0, 0);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.placeShip('Submarine', 3, 1, 0);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(1, 1);
        gameboard.receiveAttack(1, 2);
        expect(gameboard.areAllShipsSunk()).toBe(true);
    });

    test('ships cannot overlap on the gameboard', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip('Destroyer', 2, 0, 0);
        expect(() => {
            gameboard.placeShip('Submarine', 3, 0, 1);
        }).toThrow('Invalid ship placement');
    });

    test('ships placed vertically register hits correctly', () => {
        const gameboard = new Gameboard();
        gameboard.placeShip('Carrier', 5, 0, 0, 'vertical');
        gameboard.receiveAttack(3, 0);
        const ship = gameboard.getShipAt(3, 0);
        expect(ship.isHit(3)).toBe(true);
    });

    // Add more tests based on the rules and specific scenarios you'd like to test!
});

