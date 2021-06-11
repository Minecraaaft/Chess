import React from 'react'

const MoveList = ({ moveList }) => {
    let whiteMoves = []
    let blackMoves = []
    if (moveList !== undefined) {
        for (let index = 0; index < moveList.length; index++) {
            if (index % 2 === 0) {
                whiteMoves.push(moveList[index])
            } else {
                blackMoves.push(moveList[index])
            }
        }
    }

    return (
        <div >          
            {whiteMoves !== undefined ? whiteMoves.map((m, index) => (
            <div className="notation-move-line">
                <span className="move-number">{index + 1}. </span>
                <span className="notation-move white-move">{m}</span>
                <span className="notation-move black-move">{blackMoves[index]}</span>
            </div>)
            ) : ""}
        </div>
    )
}

export default MoveList

