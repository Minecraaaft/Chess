import React from 'react'

const NewGameMenu = () => {

    function clickedTime(e) {
        const newTime = e.target.id
        console.log(document.querySelector(".time-selected"));

        document.querySelector(".time-selected").innerHTML = newTime;
        
        document.querySelector(".time-option-container").classList.remove("active");
    }

    return (
        <div className="newGameMenu">
            <div className="time-option-selected" onClick={() => document.querySelector(".time-option-container").classList.toggle("active")}>
                <span className="time-selected">10 Min</span> <span className="material-icons">arrow_drop_down</span>
            </div>
            <div className="time-option-container">
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="1 Min" class="time-radio" />
                    <label htmlFor="1 Min">1 Min</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="2 | 1" class="time-radio" />
                    <label htmlFor="2 | 1">2 | 1</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="3 Min" class="time-radio" />
                    <label htmlFor="3 Min">3 Min</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="3 | 2" class="time-radio" />
                    <label htmlFor="3 | 2">3 | 2</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="5 Min" class="time-radio" />
                    <label htmlFor="5 Min">5 Min</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="3 Min" class="time-radio" />
                    <label htmlFor="3 Min">3 Min</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="10 Min" class="time-radio" />
                    <label htmlFor="10 Min">10 Min</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="10 |15" class="time-radio" />
                    <label htmlFor="10 |15">10 |15</label>
                </div>
                <div className="time-option" onClick={(e) => clickedTime(e)} >
                    <input type="radio" id="30 Min" class="time-radio" />
                    <label htmlFor="30 Min">30 Min</label>
                </div>
            </div>

            <button id="playButton" onClick={() => {
                var i;
                var x = document.getElementsByClassName("tab");
                for (i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
                if (document.getElementById("gameTab") !== undefined)
                    document.getElementById("gameTab").style.display = "block";


            }}>Play</button>
        </div>
    )
}

export default NewGameMenu
