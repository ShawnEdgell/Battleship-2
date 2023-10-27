import ReactDOM from 'react-dom';

function App() {
    return <div>Hello, Battleship!</div>;
}

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);
appRoot.render(<App />);

export default App;
