import Player from '../src/classes/Player';
import Gameboard from '../src/classes/Gameboard';

describe('Player', () => {
    let player;
    let computer;
    let playerBoard;
    let computerBoard;

    beforeEach(() => {
        playerBoard = new Gameboard();
        computerBoard = new Gameboard();
        player = new Player('Human', playerBoard, computerBoard, true);
        computer = new Player('Computer', computerBoard, playerBoard, false);
    });

    describe('Initialization', () => {
        it('should create a player with a name and associated gameboards', () => {
            expect(player.getName()).toBe('Human');
            expect(player.getPlayerBoard()).toBeInstanceOf(Gameboard);
            expect(player.getEnemyBoard()).toBeInstanceOf(Gameboard);
        });

        it('should start with the human player\'s turn', () => {
            expect(player.isTurn()).toBe(true);
            expect(computer.isTurn()).toBe(false);
        });
    });

    describe('Attack', () => {
        it('should allow a player to attack the enemy gameboard', () => {
            player.attack(5);
            expect(computerBoard.getBoardSnapshot()[5]).toBeTruthy();
        });

        it('should not allow a player to attack the same position twice', () => {
            player.attack(5);
            expect(() => player.attack(5)).toThrow('Position already attacked');
        });
    });

    describe('Computer Behavior', () => {
        it('should allow the computer to make a random legal move', () => {
            const feedback = computer.makeRandomMove();
            expect(['hit', 'Miss!']).toContain(feedback);
        });

        it('should not allow the computer to attack the same position twice', () => {
            computer.makeRandomMove();
            const position = Array.from(computer.previousMoves)[0];
            expect(() => computer.attack(position)).toThrow('Position already attacked');
        });
    });

    describe('Turn Mechanics', () => {
        it('should only allow a player to attack when it is their turn', () => {
            computer.toggleTurn(); // Mock making it the computer's turn
            player.toggleTurn();   // Also make sure it's not the player's turn
            expect(() => player.attack(5)).toThrow('Not your turn');
        });
    });
    

    describe('Game Over Detection', () => {
        it('should recognize when the enemy has no ships left', () => {
            computerBoard.sinkAllShips(); // Mock all ships as sunk
            expect(player.isGameOver()).toBe(true);
        });
    });

    describe('Player Feedback', () => {
        it('should provide accurate feedback after an attack', () => {
            const feedback = player.attack(5);
            expect(['Hit!', 'Miss!', 'You sank my battleship!']).toContain(feedback);  // Assuming you have these feedback mechanisms in place
        });
    });

    describe('Initial Ship Placement', () => {
        it('should have all ships correctly placed at the start of the game', () => {
            // This assumes that the Gameboard class has a method to check if all ships are placed
            expect(playerBoard.areAllShipsPlaced()).toBe(true);
            expect(computerBoard.areAllShipsPlaced()).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should handle erroneous moves gracefully', () => {
            expect(() => player.attack(110)).toThrow('Invalid attack position');
        });
    });
});
