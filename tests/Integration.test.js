import Gameboard from '../src/classes/Gameboard';

describe('Integration: Gameboard and Ship', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
    });

    test('should correctly place a ship on the gameboard', () => {
        gameboard.placeShip('Battleship', [0,0], 'horizontal');
        const ships = gameboard.getShips();
        expect(ships.length).toBe(1);
        expect(ships[0].getName()).toBe('Battleship');
    });

    test('should correctly register a hit when a ship is attacked', () => {
        gameboard.placeShip('Battleship', [0,0], 'horizontal');
        gameboard.receiveAttack([0,0]);
        const ship = gameboard.getShips()[0];
        expect(ship.isHit(0)).toBe(true);
    });

    test('should correctly register a miss when a ship is not at the attacked coordinates', () => {
        gameboard.placeShip('Battleship', [0,0], 'horizontal');
        gameboard.receiveAttack([5,5]);
        expect(gameboard.getMissedAttacks()).toEqual([[5,5]]);
    });

    test('should recognize when a ship has been sunk', () => {
        gameboard.placeShip('Destroyer', [0,0], 'horizontal');
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([0,1]);
        const ship = gameboard.getShips()[0];
        expect(ship.isSunk()).toBe(true);
    });

    test('should report the correct status of ships after multiple attacks', () => {
        gameboard.placeShip('Destroyer', [0,0], 'horizontal');
        gameboard.receiveAttack([0,0]);
        gameboard.receiveAttack([0,1]);
        gameboard.receiveAttack([5,5]);
        const ship = gameboard.getShips()[0];
        expect(ship.isHit(0)).toBe(true);
        expect(ship.isHit(1)).toBe(true);
        expect(gameboard.getMissedAttacks()).toEqual([[5,5]]);
    });
});
