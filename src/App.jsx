import './styles.css';
import Board from './components/Board';

function App() {
    return (
        <div>
            <h1 className="header">Battleship</h1>
            <div className="boards-container">
                <Board title="Player" />
                <Board title="Computer" />
            </div>
        </div>
    );
}

export default App;