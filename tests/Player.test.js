import Player from '../src/classes/Player';
import Gameboard from '../src/classes/Gameboard';

describe('Player', () => {
    describe('Initialization', () => {
        it('should create a player with a given name', () => {
            const player = new Player('Human');
            expect(player.getName()).toBe('Human');
        });

        it('should create a player with an associated gameboard', () => {
            const player = new Player('Human');
            expect(player.getGameboard()).toBeInstanceOf(Gameboard);
        });
    });

    describe('Making Attacks', () => {
        let human, computer, computerBoard;

        beforeEach(() => {
            human = new Player('Human');
            computer = new Player('Computer', true);
            computerBoard = computer.getGameboard();
        });

        it('should be able to make an attack on the enemy gameboard', () => {
            computerBoard.placeShip('Cruiser', 3, 5, 'horizontal');
            human.attack(computer, 5);
            expect(computerBoard.getBoardSnapshot()[5]).toBe('hit');
        });

        it('should register a miss if no ship is at the attacked coordinates', () => {
            human.attack(computer, 5);
            expect(computerBoard.getBoardSnapshot()[5]).toBe('miss');
        });
    });

    describe('Computer Player', () => {
        it('should generate a random legal move', () => {
            const computer = new Player('Computer', true);
            const attackedPosition = computer.makeRandomMove();
            // We can't predict the exact move, but we can ensure it's within bounds
            expect(attackedPosition).toBeGreaterThanOrEqual(0);
            expect(attackedPosition).toBeLessThanOrEqual(99);
        });

        it('should not shoot the same coordinate twice', () => {
            const human = new Player('Human');
            const computer = new Player('Computer', true);
            const firstMove = computer.makeRandomMove();
            human.attack(computer, firstMove);

            for (let i = 0; i < 100; i++) {
                const move = computer.makeRandomMove();
                expect(move).not.toBe(firstMove);
            }
        });
    });
});
