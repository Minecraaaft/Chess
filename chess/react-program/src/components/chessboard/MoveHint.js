import React from 'react'

const MoveHint = ({position, left, top}) => {
    return (
        <div className="moveHint" id={position} style={{position: "absolute", top: `${top}px`, left: `${left}px`}}>
            
        </div>
    )
}

export default MoveHint
