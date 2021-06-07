import React from 'react'
import MoveList from './MoveList';
import NewGameMenu from './NewGameMenu';

const GameMenu = ({fen, moveBack, currentMove}) => {
    const openTab = (city) => {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        if (document.getElementById(city) !== undefined)
            document.getElementById(city).style.display = "block";

        console.log(city)
    }

    function oneMoveBack() {
        for (let index = fen.length; index > 0 ; index--) {
            if (fen[index] === currentMove) {
                moveBack(fen[index - 1])
            }
            
        }
    }

    return (
        <div className="GameMenuBox">
            <div className="tab-container">
                <button className="tabButton" onClick={() => openTab('newGameTab')}>New Game</button>
                <button className="tabButton" onClick={() => openTab('gameTab')}>Game</button>
                <button className="tabButton" onClick={() => openTab('helloTab')}>Hellko</button>
            </div>

            <div id="newGameTab" className="tab">
                <NewGameMenu />
            </div>

            <div id="gameTab" className="tab" style={{ display: 'none' }}>
                <MoveList moveList={fen} />
                <button onclick={() => oneMoveBack()}>back</button>
            </div>

            <div id="helloTab" className="tab" style={{ display: 'none' }}>
                <MoveList moveList={fen} />
                
            </div>
        </div>
    )
}

export default GameMenu
