import React from 'react'

const optionsContainer = document.getElementsByClassName(".time-option-container")[0];

    
    // const selected = document.querySelector(".time-option-selected");
    // console.log(selected)
    // selected.addEventListener("click", () => {
    //     optionsContainer.classList.toggle("active");
    // });


const NewGameMenu = () => {
    

    return (
        <div className="newGameMenu">

            <div className="time-option-container">
                <div className="time-option">
                    <input type="radio" id="1 Min" class="time-radio" />
                    <label htmlFor="1 Min">1 Min</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="2 | 1" class="time-radio" />
                    <label htmlFor="2 | 1">2 | 1</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="3 Min" class="time-radio" />
                    <label htmlFor="3 Min">3 Min</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="3 | 2" class="time-radio" />
                    <label htmlFor="3 | 2">3 | 2</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="5 Min" class="time-radio" />
                    <label htmlFor="5 Min">5 Min</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="3 Min" class="time-radio" />
                    <label htmlFor="3 Min">3 Min</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="10 Min" class="time-radio" />
                    <label htmlFor="10 Min">10 Min</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="10 |15" class="time-radio" />
                    <label htmlFor="10 |15">10 |15</label>
                </div>
                <div className="time-option">
                    <input type="radio" id="30 Min" class="time-radio" />
                    <label htmlFor="30 Min">30 Min</label>
                </div>



            </div>
            <div className="time-option-selected">
                10 Min <span className="material-icons">arrow_drop_down</span>
            </div>

            <button id="playButton">Play</button>
        </div>
    )
}

export default NewGameMenu
