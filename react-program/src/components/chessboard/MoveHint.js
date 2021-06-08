import React from 'react'

const MoveHint = ({capture, position, left, top}) => {
    var clasName = "moveHint";
    if (capture) {
        clasName= "capture"
    }
    return (
        <div className={clasName} id={position} style={{position: "absolute", top: `${top}px`, left: `${left}px`}}>
            
        </div>
    )
}

export default MoveHint
