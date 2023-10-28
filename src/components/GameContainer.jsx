import { useState } from 'react';
import ShipPlacementModal from './ShipPlacementModal';
import Ship from '../classes/Ship';
import Gameboard from '../classes/Gameboard';
import Player from '../classes/Player';

const GameContainer = () => {
    const player1Board = new Gameboard();
    const player2Board = new Gameboard();
    const player1 = new Player('human', player1Board);
    const player2 = new Player('computer', player2Board);

    const [currentShip, setCurrentShip] = useState(null);
    const [gamePhase, setGamePhase] = useState('notStarted');
    const [orientation, setOrientation] = useState('horizontal');
    const [hoverCell, setHoverCell] = useState(null);

    const startGame = () => {
        const shipNames = Object.keys(Ship.SHIP_DETAILS);
        setCurrentShip(shipNames[0]);
        setGamePhase('placingShips');
    };

    const toggleOrientation = () => {
        setOrientation(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
    };

    const handleShipPlaced = ({ shipName, xCoord, yCoord, orientation }) => {
        try {
            player1Board.placeShip(shipName, [xCoord, yCoord], orientation);
            
            const shipNames = Object.keys(Ship.SHIP_DETAILS);
            const nextIndex = shipNames.indexOf(shipName) + 1;
            
            if (nextIndex < shipNames.length) {
                setCurrentShip(shipNames[nextIndex]);
            } else {
                setCurrentShip(null);
                player2Board.autoPlaceShips();
                setGamePhase('inProgress');
            }
        } catch (error) {
            console.error("Error placing ship:", error.message);
        }
    };

    const handleCellClick = (x, y) => {
        handleShipPlaced({
            shipName: currentShip,
            xCoord: x,
            yCoord: y,
            orientation
        });
    };

    const renderBoard = () => {
        const size = 10; // assuming a 10x10 board
        const currentShipSize = Ship.SHIP_DETAILS[currentShip];

        const rows = [];
        for(let y = 0; y < size; y++) {
            const cells = [];
            for(let x = 0; x < size; x++) {
                let className = "cell";
                if (hoverCell) {
                    const [hoverX, hoverY] = hoverCell;
                    if (orientation === 'horizontal') {
                        if (y === hoverY && x >= hoverX && x < hoverX + currentShipSize) {
                            className += " hover-ship";
                        }
                    } else {
                        if (x === hoverX && y >= hoverY && y < hoverY + currentShipSize) {
                            className += " hover-ship";
                        }
                    }
                }
                cells.push(
                    <div 
                        key={x} 
                        className={className}
                        onClick={() => handleCellClick(x, y)}
                        onMouseEnter={() => setHoverCell([x, y])}
                        onMouseLeave={() => setHoverCell(null)}
                    ></div>
                );
            }
            rows.push(<div key={y} className="row">{cells}</div>);
        }
        return <div className="board">{rows}</div>;
    };

    return (
        <div className="game-container">
            {
                gamePhase === 'notStarted' &&
                <button onClick={startGame}>Start Game</button>
            }
            {
                gamePhase === 'placingShips' && 
                <>
                    {renderBoard()}
                    <button onClick={toggleOrientation}>Toggle Orientation</button>
                </>
            }
            {/* ... Rest of the game logic, for playing phase, winning condition, etc. ... */}
        </div>
    );
};

export default GameContainer;
