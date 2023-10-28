import PropTypes from 'prop-types';
import { useState } from 'react';


function Board({ title, gameboard, game, isOwnBoard }) {
    const [boardState, setBoardState] = useState(gameboard.getBoardState());  // Assuming you have a getBoardState method in Gameboard

    const handleCellClick = (row, col) => {
        if (isOwnBoard) {
            // We may not want the player to interact with their own board for now.
            // Or this could be used during the setup phase.
            return;
        }
        
        game.playTurn([row, col]);
        setBoardState(gameboard.getBoardState());

        // Computer's turn, if you wish to do it here.
        if (game.currentPlayer.type === "computer") {
            game.currentPlayer.autoAttack(game.player1.gameboard);
            setBoardState(gameboard.getBoardState());  // Update enemy board again after computer's turn
        }
    }

    return (
        <div className="board-container">
            <h2>{title}</h2>
            <div className="board">
                {boardState.map((row, rowIndex) => (
                    row.map((cell, cellIndex) => (
                        <div 
                            key={`${rowIndex}-${cellIndex}`} 
                            className={`cell ${cell}`}
                            onClick={() => handleCellClick(rowIndex, cellIndex)}
                        ></div>
                    ))
                ))}
            </div>
        </div>
    );
}

Board.propTypes = {
    title: PropTypes.string.isRequired,
    gameboard: PropTypes.shape({
        getBoardState: PropTypes.func.isRequired,
    }).isRequired,
    game: PropTypes.shape({
        playTurn: PropTypes.func.isRequired,
        currentPlayer: PropTypes.shape({
            type: PropTypes.string.isRequired,
            autoAttack: PropTypes.func.isRequired
        }).isRequired,
        player1: PropTypes.shape({
            gameboard: PropTypes.object.isRequired
        }).isRequired
    }).isRequired,
    isOwnBoard: PropTypes.bool.isRequired,
};

export default Board;
