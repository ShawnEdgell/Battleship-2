import Player from '../src/classes/Player';
import Gameboard from '../src/classes/Gameboard';
import Game from '../src/classes/Game';

describe('Integration: Player, Gameboard, and Ship', () => {
    let playerGameboard;
    let computerGameboard;
    let player1, player2, game;

    beforeEach(() => {
        player1 = new Player('human');
        player2 = new Player('computer');
        playerGameboard = new Gameboard();
        computerGameboard = new Gameboard();
        game = new Game(player1, player2);
        
        // Assign gameboards to players
        player1.gameboard = playerGameboard;  // Assuming you would want to assign the gameboards to the players like this
        player2.gameboard = computerGameboard;
    });
    
    test('should initialize a game with two players', () => {
        expect(game.player1).toBeDefined();
        expect(game.player2).toBeDefined();
    });
    
    test('should start the game with player1', () => {
        expect(game.currentPlayer).toBe(game.player1);
    });
    
    test('should alternate turns between players', () => {
        game.playTurn([0,0]);  // player1 makes a move
        expect(game.currentPlayer).toBe(game.player1); // Expect player1 again, since player2 auto-attacks right after player1
        game.playTurn([0,1]);  // player1 makes a move again
        expect(game.currentPlayer).toBe(game.player1); // Still expect player1, for the same reason
    });
    

    
    test('player should be able to attack opponent gameboard', () => {
        computerGameboard.placeShip('Battleship', [0, 0], 'horizontal');
        player1.attack(computerGameboard, [0, 0]);
        const ship = computerGameboard.getShips()[0];
        expect(ship.isHit(0)).toBe(true);
    });

    test('computer player should make valid attacks', () => {
        for (let i = 0; i < 100; i++) { // Simulate 100 computer attacks
            player2.autoAttack(playerGameboard);
        }
        // Ensure the computer does not attack the same spot twice
        const allAttacks = player2.getAllAttacks();
        const uniqueAttacks = new Set(allAttacks.map(coord => coord.toString()));
        expect(allAttacks.length).toBe(uniqueAttacks.size);
    });

    test('should correctly register a miss when the attack doesn\'t hit a ship', () => {
        computerGameboard.placeShip('Battleship', [0, 0], 'horizontal');
        player1.attack(computerGameboard, [5, 5]);
        expect(computerGameboard.getMissedAttacks()).toEqual([[5, 5]]);
    });

    test('should recognize when a ship has been sunk', () => {
        computerGameboard.placeShip('Destroyer', [0, 0], 'horizontal');
        player1.attack(computerGameboard, [0, 0]);
        player1.attack(computerGameboard, [0, 1]);
        const ship = computerGameboard.getShips()[0];
        expect(ship.isSunk()).toBe(true);
    });

    test('should report the correct status of ships after multiple attacks', () => {
        computerGameboard.placeShip('Destroyer', [0, 0], 'horizontal');
        player1.attack(computerGameboard, [0, 0]);
        player1.attack(computerGameboard, [0, 1]);
        player1.attack(computerGameboard, [5, 5]);
        const ship = computerGameboard.getShips()[0];
        expect(ship.isHit(0)).toBe(true);
        expect(ship.isHit(1)).toBe(true);
        expect(computerGameboard.getMissedAttacks()).toEqual([[5, 5]]);
    });

    test('players should alternate turns correctly', () => {
        computerGameboard.placeShip('Destroyer', [0, 0], 'horizontal');
        game.playTurn([0, 0]);
        // After the human player attacks, the computer player should have attacked once
        expect(playerGameboard.getMissedAttacks().length + playerGameboard.getShips().filter(ship => ship.isHit(0)).length).toBe(1);
    });

    test('game should handle invalid moves or errors gracefully', () => {
        // Assuming you've implemented a mechanism to handle errors
        computerGameboard.placeShip('Destroyer', [0, 0], 'horizontal');
        expect(() => {
            player1.attack(computerGameboard, [10, 10]); // Out of bounds
        }).not.toThrow();
    });
});
