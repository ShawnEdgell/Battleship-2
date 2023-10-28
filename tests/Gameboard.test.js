import Gameboard from '../src/classes/Gameboard';

describe('Gameboard', () => {
    describe('Initialization', () => {
        it('should initialize with no ships', () => {
            const gameboard = new Gameboard();
            expect(gameboard.getShips().length).toBe(0);
        });

        it('should initialize with no missed attacks', () => {
            const gameboard = new Gameboard();
            expect(gameboard.getMissedAttacks().length).toBe(0);
        });
    });

    describe('Place Ships', () => {
        it('should be able to place a ship horizontally on the board by calling the ship factory function', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');
            expect(gameboard.getShips().length).toBe(1);
        });

        it('should be able to place a ship vertically on the board by calling the ship factory function', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'vertical');
            expect(gameboard.getShips().length).toBe(1);
        });

        it('should throw an error if placing a ship out of bounds', () => {
            const gameboard = new Gameboard();
            expect(() => gameboard.placeShip('Battleship', [8,8], 'horizontal')).toThrow('Ship goes out of board boundaries');
            expect(() => gameboard.placeShip('Destroyer', [9,9], 'vertical')).toThrow('Ship goes out of board boundaries');
        });

        it('should throw an error if two ships overlap', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');
            expect(() => gameboard.placeShip('Submarine', [2,3], 'vertical')).toThrow('Ships overlap');
        });
    });

    describe('Board Boundaries', () => {
        it('should throw an error if placing ship outside horizontal boundary', () => {
            const gameboard = new Gameboard();
            expect(() => gameboard.placeShip('Destroyer', [0, 9], 'horizontal')).toThrow('Ship goes out of board boundaries');
        });

        it('should throw an error if placing ship outside vertical boundary', () => {
            const gameboard = new Gameboard();
            expect(() => gameboard.placeShip('Destroyer', [9, 0], 'vertical')).toThrow('Ship goes out of board boundaries');
        });
    });

    describe('Repeated Attacks', () => {
        it('should throw an error if the same position is attacked again', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [1, 1], 'horizontal');
            gameboard.receiveAttack([1, 1]); // Attack once
            expect(() => gameboard.receiveAttack([1, 1])).toThrow('Position was already attacked'); // Attack the same position again
        });
    });

    describe('Receive Attacks', () => {
        it('should register a hit if a ship is at the attacked coordinates', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');
            gameboard.receiveAttack([2,2]);
            expect(gameboard.getShips()[0].isHit(0)).toBe(true);
        });

        it('should record the coordinates of the missed shot', () => {
            const gameboard = new Gameboard();
            gameboard.receiveAttack([2,2]);
            expect(gameboard.missedAttacks).toContainEqual([2,2]);
        });
    });

    describe('Report Status', () => {
        it('should be able to report whether or not all of their ships have been sunk', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');
            gameboard.placeShip('Submarine', [4,4], 'vertical');
            gameboard.receiveAttack([2,2]);
            gameboard.receiveAttack([2,3]);
            gameboard.receiveAttack([4,4]);
            gameboard.receiveAttack([5,4]);
            gameboard.receiveAttack([6,4]);
            expect(gameboard.areAllShipsSunk()).toBe(true);  // <-- changed method name
        });

        it('should report false if not all ships have been sunk', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');
            gameboard.receiveAttack([2,2]);
            expect(gameboard.areAllShipsSunk()).toBe(false); // <-- changed method name
        });
    });

    describe('All Ships Sunk', () => {
        it('should report false if not all ships are sunk', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');  // <-- added orientation
            expect(gameboard.areAllShipsSunk()).toBe(false);
        });

        it('should report true if all ships are sunk', () => {
            const gameboard = new Gameboard();
            gameboard.placeShip('Destroyer', [2,2], 'horizontal');  // <-- added orientation
            gameboard.receiveAttack([2,2]);
            gameboard.receiveAttack([2,3]);
            expect(gameboard.areAllShipsSunk()).toBe(true);
        });
    });
});
