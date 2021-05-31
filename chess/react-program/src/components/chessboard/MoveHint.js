import React from 'react'

const MoveHint = ({position, left, top}) => {
    const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
    const xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
    
    return (
        <div className="moveHint" id={position} style={{position: "absolute", top: `${top}px`, left: `${left}px`}}>
            
        </div>
    )
}

export default MoveHint
