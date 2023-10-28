class Player {
    constructor(type) {
        this.type = type;
        this.previousAttacks = [];
    }

    attack(gameboard, coords) {
        if (this.previousAttacks.some(attack => attack[0] === coords[0] && attack[1] === coords[1])) {
            throw new Error('Position was already attacked');
        }
        this.previousAttacks.push(coords);
        gameboard.receiveAttack(coords);
    }

    autoAttack(gameboard) {
        let coords;
        do {
            coords = this._getRandomCoordinates();
        } while (this.previousAttacks.some(attack => attack[0] === coords[0] && attack[1] === coords[1]));

        this.previousAttacks.push(coords);
        gameboard.receiveAttack(coords);
        return coords;  // return for testing purposes
    }

    _getRandomCoordinates() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return [x, y];
    }
}

export default Player;
