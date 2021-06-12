
import Sidebar from './components/Sidebar'
import GameMenu from './components/GameMenu'
import Chessboard from './components/chessboard/Chessboard'
import PlayerBar from './components/chessboard/PlayerBar';
import { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import { io } from 'socket.io-client'

import {socket} from '.\\..\\..\\react-program\\src\\socket.js'

function App() {
  const [notation, setNotation] = useState([]);
  const [moveNumber, setMoveNumber] = useState();
  const [fen, setFen] = useState("");
  const [color, SetColor] = useState("white");
  const [startPos, setStartPos] = useState(startPosition)
  const [xAxis, setXAxis] = useState(["a", "b", "c", "d", "e", "f", "g", "h"]);
  const [yAxis, setYAxis] = useState(["8", "7", "6", "5", "4", "3", "2", "1"]);
  const [playerNumber, setPlayerNumber] = useState()
  const [turn, setTurn] = useState();
  
  useEffect(() => {
    socket.on("chooseColor", color => {
      SetColor(color);
      
      if (color === "black") {
        console.log("changed")
        
        setStartPos(blackStartPosition)
        
      }
    })

    socket.on('clientCount', number => {
      socket.emit('serverCount', number)
    })

    socket.on("setPlayerNumber", (number) => {
      console.log("got number" + number)
      setPlayerNumber(number)
  });
  })

  return (
    <div className="app">
      <Sidebar />
      <div className="chess-container">
        <PlayerBar key={"up"} upper={true} name="Max" elo="1200" fen={fen} playerColor={color === "white" ? "black" : "white"} runningTimer={turn !== color && turn !== undefined} />
        <Chessboard updateMoveList={m => setNotation(m)} NumberOfMoveViewing={moveNumber} socket={socket}
           xaxis={xAxis} yaxis={yAxis} playerNumber={playerNumber} setTurn={turn => setTurn(turn)}
          increaseMoveNumber={moveNumber => setMoveNumber(moveNumber)} setChessStatusFen={f => setFen(f)} color={color} startPos={startPos} />
        <PlayerBar key={"down"} upper={false} name="Anonymous" elo="1100" fen={fen} playerColor={color} runningTimer={turn === color} />
      </div>
      <GameMenu moveList={notation} setMoveNumber={moveNumber => setMoveNumber(moveNumber)} currentMove={moveNumber} socket={socket} />

    </div>

  );
}


let startPosition = [
  { piece: "rook", position: "a8", color: "black", image: "./assets/black_rook.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "b8", color: "black", image: "./assets/black_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "c8", color: "black", image: "./assets/black_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "queen", position: "d8", color: "black", image: "./assets/black_queen.svg", justmoved: false, check: false, marked: false },
  { piece: "king", position: "e8", color: "black", image: "./assets/black_king.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "f8", color: "black", image: "./assets/black_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "g8", color: "black", image: "./assets/black_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "rook", position: "h8", color: "black", image: "./assets/black_rook.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "a7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "b7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "c7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "d7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "e7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "f7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "g7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "h7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: undefined, position: "a6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "h6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: undefined, position: "a5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "h5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: undefined, position: "a4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "h4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: undefined, position: "a3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "h3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: "pawn", position: "a2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false },
  { piece: "pawn", position: "b2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "c2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "d2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "e2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "f2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "g2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "h2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "rook", position: "a1", color: "white", image: "./assets/white_rook.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "b1", color: "white", image: "./assets/white_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "c1", color: "white", image: "./assets/white_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "queen", position: "d1", color: "white", image: "./assets/white_queen.svg", justmoved: false, check: false, marked: false },
  { piece: "king", position: "e1", color: "white", image: "./assets/white_king.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "f1", color: "white", image: "./assets/white_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "g1", color: "white", image: "./assets/white_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "rook", position: "h1", color: "white", image: "./assets/white_rook.svg", justmoved: false, check: false, marked: false },
]

let blackStartPosition = [
  { piece: "rook", position: "h1", color: "black", image: "./assets/black_rook.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "g1", color: "black", image: "./assets/black_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "f1", color: "black", image: "./assets/black_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "queen", position: "e1", color: "black", image: "./assets/black_queen.svg", justmoved: false, check: false, marked: false },
  { piece: "king", position: "d1", color: "black", image: "./assets/black_king.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "c1", color: "black", image: "./assets/black_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "b1", color: "black", image: "./assets/black_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "rook", position: "a1", color: "black", image: "./assets/black_rook.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "h2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "g2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "f2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "e2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "d2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "c2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "b2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "a2", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: undefined, position: "h3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "a3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: undefined, position: "h4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "a4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: undefined, position: "h5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "a5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: undefined, position: "h6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "g6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "f6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "e6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "d6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "c6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "b6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
  { piece: undefined, position: "a6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

  { piece: "pawn", position: "h7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false },
  { piece: "pawn", position: "g7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "f7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "e7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "d7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "c7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "b7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "pawn", position: "a7", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
  { piece: "rook", position: "h8", color: "white", image: "./assets/white_rook.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "g8", color: "white", image: "./assets/white_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "f8", color: "white", image: "./assets/white_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "queen", position: "e8", color: "white", image: "./assets/white_queen.svg", justmoved: false, check: false, marked: false },
  { piece: "king", position: "d8", color: "white", image: "./assets/white_king.svg", justmoved: false, check: false, marked: false },
  { piece: "bishop", position: "c8", color: "white", image: "./assets/white_bishop.svg", justmoved: false, check: false, marked: false },
  { piece: "knight", position: "b8", color: "white", image: "./assets/white_knight.svg", justmoved: false, check: false, marked: false },
  { piece: "rook", position: "a8", color: "white", image: "./assets/white_rook.svg", justmoved: false, check: false, marked: false },
]

export default App;
