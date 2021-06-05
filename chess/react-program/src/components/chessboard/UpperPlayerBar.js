import React from 'react'


const UpperPlayerBar = (props) => {
    let className = props.upper ? "upperPlayerBar" : "lowerPlayerBar";
    
    return (
        <div className={className}>
            <img className="player-icon" src="/../assets/anonymous_player.png" alt="" />
            <div className="player-info">
                <div className="UpperPlayerName">{props.name} ({props.elo})</div>
                <div className="UpperCapturedPieces">
                    
                </div>


            </div>
        </div>
    )
}

export default UpperPlayerBar
