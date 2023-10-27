class Player {
    constructor(name, enemyGameboard) {
        this.name = name;
        this.enemyGameboard = enemyGameboard;
        this.isTurn = false;  // This can be used to keep track of whose turn it is. Defaulted to false.
    }

    // Toggle player's turn
    toggleTurn() {
        this.isTurn = !this.isTurn;
    }

    // Player makes an attack on enemy gameboard
    attack(x, y) {
        if (!this.isTurn) {
            throw new Error("It's not this player's turn!");
        }
        this.enemyGameboard.receiveAttack(x, y);  // Assuming that receiveAttack is a method in the Gameboard class.
        this.toggleTurn();
    }
}

export default Player;
