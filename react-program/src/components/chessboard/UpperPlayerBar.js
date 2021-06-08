import React from 'react'


const UpperPlayerBar = (props) => {
    let className = props.upper ? "upperPlayerBar" : "lowerPlayerBar";

    return (
        <div className={className}>
            <div className="player">
                <img className="player-icon" src="/../assets/anonymous_player.png" alt="" />
                <div className="player-info">
                    <div className="UpperPlayerName">{props.name} ({props.elo})</div>
                    <div className="UpperCapturedPieces">

                    </div>


                </div>
            </div>

            <div className="time-box">1:00</div>
        </div>
    )
}

export default UpperPlayerBar