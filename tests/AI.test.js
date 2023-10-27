import AI from '../src/classes/AI';
import Gameboard from '../src/classes/Gameboard';

describe('AI', () => {
  
  let ai, enemyGameboard;

  beforeEach(() => {
    ai = new AI();
    enemyGameboard = new Gameboard();
  });

  test("should generate valid random moves", () => {
    const [x, y] = ai.generateRandomMove();
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10); // Assuming a 10x10 board
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });

  test("should make a legal move", () => {
    const [x, y] = ai.generateRandomMove();
    const spy = jest.spyOn(enemyGameboard, 'receiveAttack');
    ai.makeMove(x, y, enemyGameboard);
    expect(spy).toHaveBeenCalledWith(x, y);
  });

  it("shouldn't allow AI to attack the same spot twice", () => {
    const [x1, y1] = ai.generateRandomMove();
    ai.makeMove(x1, y1, enemyGameboard); // First move

    // Mocking the generateRandomMove method to return the same coordinates again
    jest.spyOn(ai, 'generateRandomMove').mockReturnValue([x1, y1]);

    expect(() => {
      ai.makeMove(x1, y1, enemyGameboard); // Second move on the same spot
    }).toThrow('This position has already been attacked.');
  });
});
