
import Sidebar from './components/Sidebar'
import GameMenu from './components/GameMenu'
import Chessboard from './components/chessboard/Chessboard'


function App() {
  
  return (
    <div className="app">
      <Sidebar />
      <Chessboard />
      <GameMenu />
    </div>

  );
}

export default App;
