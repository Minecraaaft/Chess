import React from 'react'
import NewGameMenu from './NewGameMenu';

const GameMenu = () => {
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
                <h2>Paris</h2>
                <p>Paris is the capital of France.</p>
            </div>

            <div id="helloTab" className="tab" style={{ display: 'none' }}>
                <h2>Tokyo</h2>
                <p>Tokyo is the capital of Japan.</p>
            </div>
        </div>
    )
}

export default GameMenu
