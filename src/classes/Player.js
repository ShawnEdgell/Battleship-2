class Player {
    constructor(name, playerBoard, enemyBoard, isStartingTurn = false) {
        this.name = name;
        this.playerBoard = playerBoard;
        this.enemyBoard = enemyBoard;
        this.turn = isStartingTurn; 
        this.previousMoves = new Set(); 
        this.unattackedPositions = new Set([...Array(100).keys()]);
    }

    getName() {
        return this.name;
    }

    getPlayerBoard() {
        return this.playerBoard;
    }

    getEnemyBoard() {
        return this.enemyBoard;
    }

    isTurn() {
        return this.turn;
    }

    toggleTurn() {
        this.turn = !this.turn;
    }

    attack(position) {
        if (position < 0 || position >= 100) {
            throw new Error('Invalid attack position');
        }
        if (this.previousMoves.has(position)) {
            throw new Error('Position already attacked');
        }
        if (!this.turn) {
            throw new Error('Not your turn');
        }

        this.previousMoves.add(position);
        const feedback = this.enemyBoard.receiveAttack(position);
        this.toggleTurn();
        return feedback;
    }

    makeRandomMove() {
        if (this.unattackedPositions.size === 0) {
            throw new Error('All positions have been attacked');
        }

        const positionsArray = [...this.unattackedPositions];
        const randomIndex = Math.floor(Math.random() * positionsArray.length);
        const position = positionsArray[randomIndex];
        this.unattackedPositions.delete(position);
        this.previousMoves.add(position);

        const feedback = this.playerBoard.receiveAttack(position);
        this.toggleTurn();

        return feedback;
    }

    isGameOver() {
        return this.enemyBoard.areAllShipsSunk();
    }
}

export default Player;
