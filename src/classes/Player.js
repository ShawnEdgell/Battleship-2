class Player {
    constructor(type) {
        this.type = type;
        this.attacks = [];
        this.allCoordinates = this._generateAllCoordinates();
        this.shuffleArray(this.allCoordinates);
    }

    attack(gameboard, coords) {
        if (this.attacks.some(attack => attack[0] === coords[0] && attack[1] === coords[1])) {
            throw new Error('Position was already attacked');
        }
        this.attacks.push(coords);
        gameboard.receiveAttack(coords);
    }

    autoAttack(gameboard) {
        if (this.allCoordinates.length === 0) {
            throw new Error('All possible attack coordinates have been used.');
        }

        const coords = this.allCoordinates.pop();
        this.attack(gameboard, coords);
        return coords;  // Return for testing purposes
    }

    getAllAttacks() {
        return this.attacks;
    }

    _generateAllCoordinates() {
        const coords = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                coords.push([x, y]);
            }
        }
        return coords;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

export default Player;
