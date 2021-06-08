import React from 'react'
import MoveList from './MoveList';
import NewGameMenu from './NewGameMenu';

const GameMenu = ({ fen, moveBack, currentMove }) => {
    const openTab = (city) => {
        var i;
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        if (document.getElementById(city) !== undefined)
            document.getElementById(city).style.display = "block";


    }

    let counter = 0;

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
                <MoveList key={counter++} moveList={fen} />
                <button onClick={() => {
                    for (let index = fen.length; index >= 0; index--) {
                        if (fen[index] === currentMove && currentMove !== undefined) { // currenMove being undefined means no move has been made
                            moveBack(fen[index - 1])
                        }

                    }

                }}
                >back</button>
                <button
                onClick={() => {
                    for (let index = fen.length; index >= 0; index--) {
                        console.log(currentMove)
                        if (fen[index] === currentMove && index < fen.length - 1) { 
                            moveBack(fen[index + 1])
                        }
                    }
                    if (currentMove === undefined) {
                        moveBack(fen[0])
                    }
                }}
                >Forward</button>
            </div>

            <div id="helloTab" className="tab" style={{ display: 'none' }}>


            </div>
        </div>
    )
}

export default GameMenu
