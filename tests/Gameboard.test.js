import Gameboard from '../src/classes/Gameboard';
import Ship from '../src/classes/Ship';

describe('Gameboard', () => {

    describe('Initialization', () => {
        it('should create an empty gameboard of 10x10', () => {
            const board = new Gameboard();
            expect(board.getBoardSize()).toBe(100);
        });
    });

    describe('placeShip', () => {
        it('should place a ship at specific coordinates', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            expect(board.getShipAt(5)).toEqual(ship);
        });

        it('should throw an error for invalid ship placement directions', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            expect(() => board.placeShip(ship, 5, 'diagonal')).toThrow('Invalid ship direction');
        });

        it('should throw an error if ship placement is out of bounds', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            expect(() => board.placeShip(ship, 9, 'horizontal')).toThrow('Invalid ship placement');
            expect(() => board.placeShip(ship, 90, 'vertical')).toThrow('Invalid ship placement');
        });

        it('should throw an error if ship overlaps with another', () => {
            const board = new Gameboard();
            const ship1 = new Ship('Test Ship1', 3);
            const ship2 = new Ship('Test Ship2', 3);
            board.placeShip(ship1, 5, 'horizontal');
            expect(() => board.placeShip(ship2, 6, 'horizontal')).toThrow('Overlap with another ship');
        });

        it('should place a ship vertically without errors', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Vertical Ship', 3);
            board.placeShip(ship, 10, 'vertical');
            expect(board.getShipAt(10)).toEqual(ship);
        });

        describe('Classic Battleship Ships Placement', () => {
            it('should place an Aircraft Carrier of length 5', () => {
                const board = new Gameboard();
                const aircraftCarrier = new Ship('Aircraft Carrier', 5);
                board.placeShip(aircraftCarrier, 0, 'horizontal');
                expect(board.getShipAt(0).getSize()).toBe(5);
            });
        
            it('should place a Battleship of length 4', () => {
                const board = new Gameboard();
                const battleship = new Ship('Battleship', 4);
                board.placeShip(battleship, 10, 'horizontal');
                expect(board.getShipAt(10).getSize()).toBe(4);
            });
        
            it('should place a Cruiser of length 3', () => {
                const board = new Gameboard();
                const cruiser = new Ship('Cruiser', 3);
                board.placeShip(cruiser, 20, 'horizontal');
                expect(board.getShipAt(20).getSize()).toBe(3);
            });
        
            it('should place a Submarine of length 3', () => {
                const board = new Gameboard();
                const submarine = new Ship('Submarine', 3);
                board.placeShip(submarine, 30, 'horizontal');
                expect(board.getShipAt(30).getSize()).toBe(3);
            });
        
            it('should place a Destroyer of length 2', () => {
                const board = new Gameboard();
                const destroyer = new Ship('Destroyer', 2);
                board.placeShip(destroyer, 40, 'horizontal');
                expect(board.getShipAt(40).getSize()).toBe(2);
            });
        });
    });

    describe('receiveAttack', () => {
        it('should register a hit if a ship is at the coordinates', () => {
            const board = new Gameboard();
            const ship = new Ship('TestShip', 3);
            board.placeShip(ship, 5, 'horizontal');
            board.receiveAttack(5);
            expect(ship.isPositionHit(0)).toBe(true);
        });
        

        it('should register a miss if no ship is at the coordinates', () => {
            const board = new Gameboard();
            board.receiveAttack(2);
            expect(board.getMissedShots()).toContain(2);
        });

        it('should throw an error if the attack position is out of bounds', () => {
            const board = new Gameboard();
            expect(() => board.receiveAttack(101)).toThrow('Invalid attack position');
        });

        it('should throw an error if the position was already attacked', () => {
            const board = new Gameboard();
            board.receiveAttack(2);
            expect(() => board.receiveAttack(2)).toThrow('Position already attacked');
        });

        it('should sink a ship after it has been hit on all its positions', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            board.receiveAttack(5);
            board.receiveAttack(6);
            board.receiveAttack(7);
            expect(ship.isSunk()).toBe(true);
        });
    });

    describe('areAllShipsSunk', () => {
        it('should return false if not all ships are sunk', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            expect(board.areAllShipsSunk()).toBe(false);
        });

        it('should return true if all ships are sunk', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            board.receiveAttack(5);
            board.receiveAttack(6);
            board.receiveAttack(7);
            expect(board.areAllShipsSunk()).toBe(true);
        });
    });

    describe('sinkAllShips', () => {
        it('should sink all ships on the board', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            board.sinkAllShips();
            expect(ship.isSunk()).toBe(true);
        });
    });

    // New tests for ship placement:
    describe('areAllShipsPlaced', () => {
        it('should return false if not all ships are placed', () => {
            const board = new Gameboard();
            expect(board.areAllShipsPlaced()).toBe(false);
        });

        it('should return true if all ships are placed', () => {
            const board = new Gameboard();

            const aircraftCarrier = new Ship('Aircraft Carrier', 5);
            board.placeShip(aircraftCarrier, 0, 'horizontal');

            const battleship = new Ship('Battleship', 4);
            board.placeShip(battleship, 10, 'horizontal');

            const cruiser = new Ship('Cruiser', 3);
            board.placeShip(cruiser, 20, 'horizontal');

            const submarine = new Ship('Submarine', 3);
            board.placeShip(submarine, 30, 'horizontal');

            const destroyer = new Ship('Destroyer', 2);
            board.placeShip(destroyer, 40, 'horizontal');

            expect(board.areAllShipsPlaced()).toBe(true);
        });
    });

    describe('getBoardSnapshot', () => {
        it('should return a snapshot representation of the board', () => {
            const board = new Gameboard();
            const snapshot = board.getBoardSnapshot();
            expect(snapshot).toBeInstanceOf(Array);
            expect(snapshot.length).toBe(100); // Assuming a 10x10 board.
        });

        it('should mark hit and missed shots on the snapshot', () => {
            const board = new Gameboard();
            board.receiveAttack(2);
            const snapshot = board.getBoardSnapshot();
            expect(snapshot[2]).toBe('missed');
        });

        it('should mark ship placements on the snapshot', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            const snapshot = board.getBoardSnapshot();
            expect(snapshot[5]).toBe('ship');
            expect(snapshot[6]).toBe('ship');
            expect(snapshot[7]).toBe('ship');
        });

        it('should mark hit ships on the snapshot', () => {
            const board = new Gameboard();
            const ship = new Ship('Test Ship', 3);
            board.placeShip(ship, 5, 'horizontal');
            board.receiveAttack(5);
            const snapshot = board.getBoardSnapshot();
            expect(snapshot[5]).toBe('hit');
        });
    });
});
