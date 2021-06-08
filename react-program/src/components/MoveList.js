import React from 'react'

const MoveList = ({ moveList }) => {
    
    let moves;
    let whiteMoves = []
    let blackMoves = []
    if (moveList !== undefined) {
        // moves = moveList.map((m, index) => {
        //     if ((index) % 2 === 0)
                
        //         return (index / 2 + 1) + ". " + <span>{(index / 2 + 1) + ". " + m}</span>
        //     else
        //         return <span>{m}</span>;   
        // })
        // for (let index = 0; index < moves.length; index++) {
            
        //     if ( moves[index].charAt(0) >= '0' && moves[index].charAt(0) >= '9' && index > 0) {
        //         moves[index - 1] += (" " + moves[index] + "\n")
        //         moves.splice(index, 1)
                
        //     }
        // }
        
        for (let index = 0; index < moveList.length; index++) {
            
            if (index % 2 === 0) {
                whiteMoves.push(moveList[index])
            } else {
                blackMoves.push(moveList[index])
            }
        }
        console.log(moves)
    }
    

    return (
        <div >
            {/* {(() => moveList.map( (m, index) => {
                if (index % 2 === 0 && moveList.length) {
                    
                    
                }
                return <span>{m}</span>
            }))()} */}
            {/* {moves.map((m) => <div>{m}</div>)} */}
            
            {whiteMoves !== undefined ? whiteMoves.map((m, index) => <div className="notation-move-line"><span>{index + 1}. </span><span className="notation-move">{m}</span> <span className="notation-move">{blackMoves[index]}</span></div>) : ""}
            
        </div>
    )
}

export default MoveList

