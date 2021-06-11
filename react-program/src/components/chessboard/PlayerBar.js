import React from 'react'
import Timer from './Timer'


const PlayerBar = (props) => {
    let className = props.upper ? "upperPlayerBar" : "lowerPlayerBar";
    let pieces = [];
    return (
        <div className={className}>
            <div className="player">
                <img className="player-icon" src="/../assets/anonymous_player.png" alt="" />
                <div className="player-info">
                    <div className="UpperPlayerName">{props.name} ({props.elo})</div>
                    {(() => {
                        console.log(props.fen)
                        let queens = 0;
                        let rooks = 0;
                        let bishops = 0;
                        let knights = 0;
                        let pawns = 0;

                        for (let index = 0; index < props.fen.length; index++) {

                            if (props.fen[index] === 'Q') {
                                queens++;
                            } else if (props.fen[index] === 'q') {
                                queens--;
                            } else if (props.fen[index] === 'R') {
                                rooks++;
                            } else if (props.fen[index] === 'r') {
                                rooks--;
                            } else if (props.fen[index] === 'B') {
                                bishops++;
                            } else if (props.fen[index] === 'b') {
                                bishops--;
                            } else if (props.fen[index] === 'N') {
                                knights++;
                            } else if (props.fen[index] === 'n') {
                                knights--;
                            } else if (props.fen[index] === 'P') {
                                pawns++;
                            } else if (props.fen[index] === 'p') {
                                pawns--;
                            }
                            if (props.fen[index] === " ") {
                                break;
                            }
                        }
                        let color = props.playerColor === "white" ? "black" : "white";
                        if (props.playerColor === "black") {
                            queens = queens * -1;
                            rooks = rooks * -1;
                            bishops = bishops * -1;
                            knights = knights * -1;
                            pawns = pawns * -1;
                        }

                        for (let index = 0; index < queens; index++)
                            pieces.push(<img className="capturedPiece" src={`/../assets/mini_${color}_queen.png`} alt="" />);
                        for (let index = 0; index < rooks; index++)
                            pieces.push(<img className="capturedPiece" src={`/../assets/mini_${color}_rook.png`} alt="" />);
                        for (let index = 0; index < bishops; index++)
                            pieces.push(<img className="capturedPiece" src={`/../assets/mini_${color}_bishop.png`} alt="" />);
                        for (let index = 0; index < knights; index++)
                            pieces.push(<img className="capturedPiece" src={`/../assets/mini_${color}_knight.png`} alt="" />);
                        for (let index = 0; index < pawns; index++)
                            pieces.push(<img className="capturedPiece" src={`/../assets/mini_${color}_pawn.png`} alt="" />);

                        let points = queens * 9 + rooks * 5 + bishops * 3 + knights * 3 + pawns;
                        if (points > 0) {
                            pieces.push(<span id="points">+{points}</span>)
                        }
                    })()}
                    <div className="UpperCapturedPieces">
                        {pieces}
                    </div>


                </div>
            </div>

            <Timer minute={10} second={0} />
        </div>
    )
}

export default PlayerBar
