
import Sidebar from './components/Sidebar'
import GameMenu from './components/GameMenu'
import Chessboard from './components/chessboard/Chessboard'
import PlayerBar from './components/chessboard/PlayerBar';
import {useState, useEffect,useRef } from'react';
import { Chess } from 'chess.js';


function App() {
  const [notation, setNotation] = useState([]);
  const [moveNumber, setMoveNumber] = useState();
  const [fen, setFen] = useState("");
  
  
  return (
    <div className="app">
      <Sidebar />
      <div className="chess-container">
        <PlayerBar key={"up"} upper={true} name="Max" elo="1200" fen={fen} playerColor={"black"} />
        <Chessboard updateMoveList={m => setNotation(m)} NumberOfMoveViewing={moveNumber} 
        increaseMoveNumber={moveNumber => setMoveNumber(moveNumber)} setChessStatusFen={f => setFen(f)}/>
        <PlayerBar key={"down"} upper={false} name="Anonymous" elo="1100" fen={fen} playerColor={"white"} />
      </div>
      <GameMenu moveList={notation} setMoveNumber={moveNumber => setMoveNumber(moveNumber)} currentMove={moveNumber} />
      
    </div>

  );
}

export default App;
