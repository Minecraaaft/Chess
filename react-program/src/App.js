
import Sidebar from './components/Sidebar'
import GameMenu from './components/GameMenu'
import Chessboard from './components/chessboard/Chessboard'
import UpperPlayerBar from './components/chessboard/UpperPlayerBar';
import {useState, useEffect,useRef } from'react';
import { Chess } from 'chess.js';


function App() {
  const [notation, setNotation] = useState([]);
  const [move, setMove] = useState();
  
  
  return (
    <div className="app">
      <Sidebar />
      <div className="chess-container">
        <UpperPlayerBar key={"up"} upper={true} name="Max" elo="1200"/>
        <Chessboard updateFen={fen => setNotation(fen)} moveBack={move} resetMove={move => setMove(move, console.log(move))} />
        <UpperPlayerBar key={"down"} upper={false} name="Anonymous" elo="1100"/>
      </div>
      <GameMenu fen={notation} moveBack={move => setMove(move)} currentMove={move} />
      
    </div>

  );
}

export default App;
