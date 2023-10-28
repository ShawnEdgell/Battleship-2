class Game {
    constructor(player1, player2) {
        this.player1 = player1; // Human player
        this.player2 = player2; // Computer player
        this.currentPlayer = player1; // Human player starts
    }

    switchTurns() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }

    playTurn(coord) {
        // Player 1's turn (Human player)
        if (this.currentPlayer === this.player1) {
            this.player1.attack(this.player2.gameboard, coord); // Human attacks computer
            this.switchTurns();

            this.player2.autoAttack(this.player1.gameboard); // Computer attacks human
            this.switchTurns();
        }
        // If ever you wish to extend the game to multiplayer, you can add logic here for player2's manual turn.
    }
}

export default Game;
