import Player from '../src/classes/Player';  // Adjust the path accordingly
import Gameboard from '../src/classes/Gameboard';

describe('Player', () => {
    let player;
    let gameboard;

    beforeEach(() => {
        player = new Player('human');
        gameboard = new Gameboard();
    });

    describe('Attack', () => {
        it('should be able to attack a gameboard', () => {
            gameboard.placeShip('Destroyer', [0, 0], 'horizontal');
            player.attack(gameboard, [0, 0]);
            expect(gameboard.getShips()[0].isHit(0)).toBeTruthy();
        });

        it('should throw an error if the same position is attacked again', () => {
            expect(() => {
                player.attack(gameboard, [0, 0]);
                player.attack(gameboard, [0, 0]);
            }).toThrow('Position was already attacked');
        });
    });

    describe('Auto Attack', () => {
        let computerPlayer;

        beforeEach(() => {
            computerPlayer = new Player('computer');
        });

        it('should allow the computer to make a legal random attack', () => {
            gameboard.placeShip('Destroyer', [0, 0], 'horizontal');
            computerPlayer.autoAttack(gameboard);
            const attacks = gameboard.getMissedAttacks().concat(gameboard.getShips().flatMap(ship => ship.positions));
            expect(attacks.length).toBeGreaterThan(0);
        });

        it('should ensure computer does not attack the same coordinate twice', () => {
            for (let i = 0; i < 100; i++) {  // Simulate many attacks to ensure no repeat
                computerPlayer.autoAttack(gameboard);
            }
            const uniqueAttacks = new Set(computerPlayer.previousAttacks.map(JSON.stringify));
            expect(uniqueAttacks.size).toBe(computerPlayer.previousAttacks.length);
        });
    });
});
