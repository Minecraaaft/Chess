import React from 'react'

const MoveList = ({ moveList }) => {
    
    let moves;
    if (moveList !== undefined) {
        moves = moveList.map((m, index) => {
            if ((index) % 2 === 0)
                
                return (index / 2 + 1) + ". " + m
            else
                return m;   
        })
        for (let index = 0; index < moves.length; index++) {
            console.log(typeof moves[index].charAt(0))
            if ( moves[index].charAt(0) >= '0' && moves[index].charAt(0) >= '9' && index > 0) {
                moves[index - 1] += (" " + moves[index] + "\n")
                moves.splice(index, 1)
                
            }
        }
        
    }

    return (
        <div>
            {moves !== undefined ? moves.map(m => <div>{m}</div>) : ""}
            
        </div>
    )
}

export default MoveList

