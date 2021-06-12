import React from 'react'
import MoveList from './MoveList';
import NewGameMenu from './NewGameMenu';

const GameMenu = ({ moveList, setMoveNumber, currentMove, socket }) => {
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
                <NewGameMenu socket={socket} />
            </div>

            <div id="gameTab" className="tab" style={{ display: 'none' }}>
                <MoveList key={counter++} moveList={moveList} />
                <button onClick={() => {
                    if (currentMove > 0) {
                        let newMoveNumber = currentMove - 1;
                        setMoveNumber(newMoveNumber)
                    }
                }}
                >back</button>
                <button
                    onClick={() => {
                        if (currentMove < moveList.length) {
                            let newMoveNumber = currentMove + 1;
                            setMoveNumber(newMoveNumber)
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
