import Ship from '../src/classes/Ship';
import Gameboard from '../src/classes/Gameboard';

describe('Integration Test: Gameboard and Ship', () => {
    let board;

    beforeEach(() => {
        board = new Gameboard();
    });

    it('should place ships, conduct attacks, and report game status correctly', () => {
        const cruiser = new Ship('Cruiser', 3);

        // Place the cruiser on the gameboard
        board.placeShip(cruiser, 5, 'horizontal');

        // Attack a point where there's no ship
        board.receiveAttack(0);
        expect(board.getBoardSnapshot()[0]).toBe('missed');

        // Attack the cruiser and check if it gets hit
        board.receiveAttack(5);
        expect(cruiser.isHit(0)).toBe(true);

        // Attack the rest of the cruiser
        board.receiveAttack(6);
        board.receiveAttack(7);
        expect(cruiser.isSunk()).toBe(true);

        // Place more ships and attack them
        const destroyer = new Ship('Destroyer', 2);
        board.placeShip(destroyer, 20, 'vertical');
        board.receiveAttack(20);
        board.receiveAttack(30);
        expect(destroyer.isSunk()).toBe(true);

        const aircraftCarrier = new Ship('Aircraft Carrier', 5);
        board.placeShip(aircraftCarrier, 50, 'horizontal');
        board.receiveAttack(50);
        board.receiveAttack(51);
        board.receiveAttack(52);
        board.receiveAttack(53);
        // Do not attack the last section, so it shouldn't be sunk
        expect(aircraftCarrier.isSunk()).toBe(false);

        // Check the status of all ships on the board
        expect(board.areAllShipsSunk()).toBe(false);

        // Sink the last ship
        board.receiveAttack(54);
        expect(aircraftCarrier.isSunk()).toBe(true);
        expect(board.areAllShipsSunk()).toBe(true);
    });
});
