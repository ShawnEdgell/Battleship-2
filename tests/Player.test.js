import Player from '../src/classes/Player';
import Gameboard from '../src/classes/Gameboard';

describe('Player', () => {
  
  let player, enemyGameboard;

  beforeEach(() => {
    player = new Player();
    enemyGameboard = new Gameboard();
  });

  test('should initialize properly', () => {
    expect(player.isTurn).toBe(false);
  });

  test("should not attack if it's not their turn", () => {
    expect(() => {
      player.attack(3, 4, enemyGameboard);
    }).toThrow("It's not this player's turn!");
  });

  test("should attack the enemy's gameboard when it's their turn", () => {
    player.toggleTurn();
    const spy = jest.spyOn(enemyGameboard, 'receiveAttack');
    player.attack(3, 4, enemyGameboard);
    expect(spy).toHaveBeenCalledWith(3, 4);
  });

  test("should toggle their turn after an attack", () => {
    player.toggleTurn();
    player.attack(3, 4, enemyGameboard);
    expect(player.isTurn).toBe(false);
  });

  it("shouldn't allow players to attack the same spot twice", () => {
    enemyGameboard.placeShip('Destroyer', 3, [1, 1], 'horizontal');
    player.attack(1, 1, enemyGameboard); // First attack
    expect(() => {
      player.attack(1, 1, enemyGameboard); // Second attack on the same spot
    }).toThrow('You have already attacked this position.');
  });

  it("should register attacks properly - hits", () => {
    enemyGameboard.placeShip('Submarine', 3, [2, 2], 'horizontal');
    player.attack(2, 2, enemyGameboard);
    expect(enemyGameboard.getBoard()[2][2]).toBe('hit');
  });

  it("should register attacks properly - misses", () => {
    player.attack(0, 0, enemyGameboard);
    expect(enemyGameboard.getBoard()[0][0]).toBe('miss');
  });

  it("should register attacks properly - sinking ships", () => {
    enemyGameboard.placeShip('Submarine', 3, [2, 2], 'horizontal');
    player.attack(2, 2, enemyGameboard);
    player.attack(2, 3, enemyGameboard);
    player.attack(2, 4, enemyGameboard);
    const submarine = enemyGameboard.getShips().find(ship => ship.name === 'Submarine');
    expect(submarine.isSunk()).toBeTruthy();
  });
});
