
import Sidebar from './components/Sidebar'
import GameMenu from './components/GameMenu'
import Chessboard from './components/chessboard/Chessboard'
import UpperPlayerBar from './components/chessboard/UpperPlayerBar';


function App() {
  
  return (
    <div className="app">
      <Sidebar />
      <div className="chess-container">
        <UpperPlayerBar upper={true} name="Max" elo="1200"/>
        <Chessboard />
        <UpperPlayerBar upper={false} name="Anonymous" elo="1100"/>
      </div>
      
      <GameMenu />
    </div>

  );
}

export default App;
