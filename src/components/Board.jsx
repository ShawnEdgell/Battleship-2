import PropTypes from 'prop-types';
import Cell from './Cell';

const Board = ({ player }) => {
  const generateBoard = () => {
    let board = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board.push(<Cell key={`${i}-${j}`} />);
        }
    }
    return board;
  };

  return (
    <div className="boardContainer">
      <h2>{player} Board</h2>
      <section className="gameBoard">
        {generateBoard()}
      </section>
    </div>
  );
};

Board.propTypes = {
  player: PropTypes.string.isRequired,
};

export default Board;
