import PropTypes from 'prop-types';

function Board({ title }) {
    return (
        <div className="board-container">
            <h2>{title} Board</h2>
            <div className="board">
                {Array(100).fill(null).map((_, index) => (
                    <div key={index} className="cell"></div>
                ))}
            </div>
        </div>
    );
}

Board.propTypes = {
    title: PropTypes.string.isRequired
};

export default Board;
