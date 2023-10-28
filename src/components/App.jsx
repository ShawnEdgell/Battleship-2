import Board from './Board';

function App() {
  return (
    <div className="app">
      <h1>Battleship</h1>
      
      <Board player="Your" />
      <Board player="Opponent&rsquo;s" />
      
      {/* Game Controls & Messages */}
      <section className="game-controls">
        {/* Buttons, messages, or other game-related controls */}
      </section>
    </div>
  );
}

export default App;
