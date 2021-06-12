import React from 'react'
import Tile from './Tile'
import { useState, useRef, useEffect } from 'react';
import Chess from 'chess.js'
import MoveHint from './MoveHint';


var game = new Chess();
var backwardsGame = new Chess();



let tilesJustMoved = [];

const Chessboard = ({ updateMoveList, NumberOfMoveViewing, increaseMoveNumber, setChessStatusFen, 
    color, startPos, moveMethod, xaxis, yaxis, playerNumber, socket, setTurn }) => {
    // const [game, setGame] = useState(new Chess());
    // const [backwardsGame, setBackwardsGame] = useState(new Chess())
    const chessboardRef = useRef(null);
    //const [moveback, setMoveBack] = useState({ moveBack })

    const [positionL, setPieces] = useState(startPos);
    const [colorr, setColor] = useState(color)
    const [hints, setHints] = useState([]);
    const [captures, setCaptures] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [lastClicked, setLastClicked] = useState();
    const [arrows, setArrows] = useState([]);
    const [rightClicked, setRightClicked] = useState(null);
    const [markedTiles, setMarkerTiles] = useState([]);
    const [numberOfMovements, setNumberOfMovements] = useState(NumberOfMoveViewing ===undefined ? 0 : NumberOfMoveViewing)

    const [xAxis, setXAxis] = useState(xaxis);
    const [yAxis, setYAxis] = useState(yaxis);


    // if (socket !== undefined) {
    useEffect(() => {
        socket.on("serverMove", moveObject => {

            game.move({
                from: moveObject.from,
                to: moveObject.to,
                promotion: 'q'
            })
            console.log("got move message")

            updateMoveList(game.history());
            setChessStatusFen(game.fen());
            let newNumberOfMoves = NumberOfMoveViewing === undefined ? 1 : NumberOfMoveViewing + 1;
            increaseMoveNumber(newNumberOfMoves);
            setHints([]);
            setCaptures([]);
            if (game.turn() === "w") {
                setTurn("white");
            } else {
                setTurn("black");
            }
        })

    }, [])

    function loadFen(fen) {
        let counter = 0;

        if (color === "black") {
            fen = fen.split(" ")[0];
            fen = fen.split("").reverse().join("")
        }

        for (let index = 0; index < positionL.length; index++) {
            const notation = fen[counter];
            const p = positionL[index];

            if (notation === "k") {
                p.color = "black";
                p.image = "./assets/black_king.svg";
                p.piece = "king";
            } else if (notation === "q") {
                p.color = "black";
                p.image = "./assets/black_queen.svg";
                p.piece = "queen";
            } else if (notation === "b") {
                p.color = "black";
                p.image = "./assets/black_bishop.svg";
                p.piece = "bishop";
            } else if (notation === "n") {
                p.color = "black";
                p.image = "./assets/black_knight.svg";
                p.piece = "knight";
            } else if (notation === "r") {
                p.color = "black";
                p.image = "./assets/black_rook.svg";
                p.piece = "rook";
            } else if (notation === "p") {
                p.color = "black";
                p.image = "./assets/black_pawn.svg";
                p.piece = "pawn";
            }

            if (notation === "K") {
                p.color = "white";
                p.image = "./assets/white_king.svg";
                p.piece = "king";
            } else if (notation === "Q") {
                p.color = "white";
                p.image = "./assets/white_queen.svg";
                p.piece = "queen";
            } else if (notation === "B") {
                p.color = "white";
                p.image = "./assets/white_bishop.svg";
                p.piece = "bishop";
            } else if (notation === "N") {
                p.color = "white";
                p.image = "./assets/white_knight.svg";
                p.piece = "knight";
            } else if (notation === "R") {
                p.color = "white";
                p.image = "./assets/white_rook.svg";
                p.piece = "rook";
            } else if (notation === "P") {
                p.color = "white";
                p.image = "./assets/white_pawn.svg";
                p.piece = "pawn";
            } else {
                var emptyTiles = 0;

                for (var i = 0; i < parseInt(notation); i++) {
                    positionL[index + i].color = undefined;
                    positionL[index + i].image = undefined;
                    positionL[index + i].piece = undefined;

                    emptyTiles = i;
                }
                index += emptyTiles;
            }

            if (fen[counter + 1] === "/") {
                counter++;
            }

            counter++;

        }

        const currentTurn = game.turn();

        if (backwardsGame.in_check()) {
            const king = positionL.find(p => p.color !== undefined && p.color.charAt(0) === currentTurn && p.piece === "king")
            king.check = true;
        } else {
            positionL.forEach(p => {
                p.check = false;
                if (move.promotion === 'q') {
                    p.piece = "queen";
                    if (currentTurn === "w") {
                        p.image = `./assets/white_queen.svg`
                    } else {
                        p.image = `./assets/black_queen.svg`
                    }
                }
            })
        }

        if (tilesJustMoved.length > 1) {
            positionL.forEach(p => {
                if (p.position === tilesJustMoved[0] || p.position === tilesJustMoved[1]) {
                    p.justmoved = false;
                }
            })
            tilesJustMoved[0] = undefined;
            tilesJustMoved[1] = undefined;
        }

        if (backwardsGame.history().length > 0) {
            const historyLength = backwardsGame.history().length;
            tilesJustMoved[0] = backwardsGame.history({ verbose: true })[historyLength - 1].from;
            tilesJustMoved[1] = backwardsGame.history({ verbose: true })[historyLength - 1].to;


            positionL.forEach(p => {
                if (p.position === tilesJustMoved[0] || p.position === tilesJustMoved[1]) {
                    p.justmoved = true;
                }
            })

        }
    }

    function addArrow(from, to) {
        let x1 = xAxis.indexOf(from.charAt(0)) * 100 + 50;
        let y1 = yAxis.indexOf(from.charAt(1)) * 100 + 50;

        let x2 = xAxis.indexOf(to.charAt(0)) * 100 + 50;
        let y2 = yAxis.indexOf(to.charAt(1)) * 100 + 50;

        if (color === "black") {
            x1 = ["h", "g", "f", "e", "d", "c", "b", "a"].indexOf(from.charAt(0)) * 100 + 50;
            y1 = ["1", "2", "3", "4", "5", "6", "7", "8"].indexOf(from.charAt(1)) * 100 + 50;

            x2 = ["h", "g", "f", "e", "d", "c", "b", "a"].indexOf(to.charAt(0)) * 100 + 50;
            y2 = ["1", "2", "3", "4", "5", "6", "7", "8"].indexOf(to.charAt(1)) * 100 + 50;
        }

        if (y1 > y2) {
            y2 += 10;
        } else if (y1 < y2) {
            y2 -= 10;
        }

        if (x1 > x2) {
            x2 += 10;
        } else if (x1 < x2) {
            x2 -= 10;
        }

        if (x1 === x2 && y1 === y2) {
            return;
        }
        const id = x1 + "," + x2 + "," + y1 + "," + y2;
        let arrowAlreadyIn = false;
        arrows.forEach(p => {
            if (p.props.id === id) {
                const index = arrows.indexOf(p);
                // removes the item with index = i
                setArrows(arrows.filter((_, i) => i !== index))

                arrowAlreadyIn = true
            }
        })

        const newElement = (
            <svg position="absolute" height="800" width="800" id={id}>
                <defs>
                    <marker id="head" orient="auto" markerHeight="8" markerWidth="4" refX="2" refY="2">
                        <path d="M0,0 V4 L3,2 Z" fill="green" />
                    </marker>
                </defs>
                <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#head)" opacity="0.6"></line>
            </svg>);

        if (!arrowAlreadyIn) {
            setArrows(oldArray => [...oldArray, newElement]);
        }
    }

    function move(from, to) {
        var move = game.move({
            from: from,
            to: to,
            promotion: 'q'
        })

        if (move !== null) {
            let moveObject = {
                from: from,
                to: to,
                playerNumber: playerNumber
            }

            updateMoveList(game.history());
            setChessStatusFen(game.fen())
            loadFen(game.fen());
            let newNumberOfMoves = NumberOfMoveViewing === undefined ? 1 : NumberOfMoveViewing + 1;
            increaseMoveNumber(newNumberOfMoves);
            socket.emit("clientMove", moveObject);
            if (game.turn() === "w") {
                setTurn("white");
            } else {
                setTurn("black");
            }
            setHints([]);
            setCaptures([]);
        } else {
            if (activePiece !== null) {
                activePiece.style.position = "static";
                activePiece.style.removeProperty('top');
                activePiece.style.removeProperty('left');
            }
        }

        setActivePiece(null);
    }

    function removeMarkedTiles() {
        positionL.forEach(p => {
            p.marked = false;
        })
    }

    function grabPiece(e) {
        let x;
        let y;
        if (color === "white") {
            x = xAxis;
            y = yAxis
        } else {
            x = ["h", "g", "f", "e", "d", "c", "b", "a"]
            y = ["1", "2", "3", "4", "5", "6", "7", "8"]
        }
        if (e.button < 2) {

            setArrows([]);
            removeMarkedTiles();
            const element = e.target;
            const pieceClicked = positionL.find(p => p.position === element.id);


            if (lastClicked !== undefined) { // need id only 
                const chessboard = chessboardRef.current;
                let tileClicked = x[Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + y[Math.floor((e.clientY - chessboard.offsetTop) / 100)];
                if (color === "black") {
                    tileClicked = ["h", "g", "f", "e", "d", "c", "b", "a"][Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + ["1", "2", "3", "4", "5", "6", "7", "8"][Math.floor((e.clientY - chessboard.offsetTop) / 100)];

                }

                move(lastClicked.id, tileClicked);
                setLastClicked(undefined);
            }
            let justCapturedAPiece = false;

            // if last move was a capture and you're trying to move a piece from same square
            if (game.history().length > 0 && game.history({ verbose: true })[game.history().length - 1].captured !== undefined
                && game.history({ verbose: true })[game.history().length - 1].to === element.id) { // need id only
                justCapturedAPiece = true;
            }

            if (element.classList.contains("piece") && !justCapturedAPiece) {
                if (lastClicked !== undefined) {
                    positionL.forEach(p => {
                        if (p.position === lastClicked.id) {
                            p.justmoved = false;
                        }
                    })
                }
                setLastClicked(element);
                if (!tilesJustMoved.includes(element.id)) {
                    positionL.forEach(p => {
                        if (p.position === element.id) {

                            p.justmoved = true;
                        }
                    })
                }

                var possibleMoves = game.moves({ square: pieceClicked.position });
                hints.length = 0;
                captures.length = 0;
                var notation = [];
                var chars = { "B": "", "N": "", "+": "", "#": "", "Q": "", "K": "", "R": "" };
                var capturesNotation = [];

                for (let i = 0; i < possibleMoves.length; i++) {
                    let n = possibleMoves[i].replace(/[RQKBN+#]/g, m => chars[m]);
                    if (possibleMoves[i].includes("x")) {
                        capturesNotation.push(n.slice(-2))
                    } else {
                        notation.push(n.slice(-2));
                    }

                }

                const currentTurn = game.turn();
                positionL.forEach(p => {

                    if (capturesNotation.includes(p.position)) {
                        setCaptures(c => [...c, { position: p.position, top: chessboardRef.current.offsetTop + y.indexOf(p.position.charAt(1)) * 100, left: chessboardRef.current.offsetLeft + x.indexOf(p.position.charAt(0)) * 100 }]);

                    }

                    if (notation.includes(p.position)) {
                        setHints(h => [...h, { position: p.position, top: chessboardRef.current.offsetTop + y.indexOf(p.position.charAt(1)) * 100 + 35, left: chessboardRef.current.offsetLeft + x.indexOf(p.position.charAt(0)) * 100 + 35 }]);
                    }

                    // if castling extra hint circle is given
                    if (possibleMoves.includes("O-O")) {
                        if ((currentTurn === "w" && p.position === "g1") || (currentTurn === "b" && p.position === "g8")) {
                            hints.push({ position: p.position, top: chessboardRef.current.offsetTop + y.indexOf(p.position.charAt(1)) * 100 + 35, left: chessboardRef.current.offsetLeft + x.indexOf(p.position.charAt(0)) * 100 + 35 });
                        }
                    }
                    if (possibleMoves.includes("O-O-O")) {
                        if ((currentTurn === "w" && p.position === "c1") || (currentTurn === "b" && p.position === "c8")) {
                            hints.push({ position: p.position, top: chessboardRef.current.offsetTop + y.indexOf(p.position.charAt(1)) * 100 + 35, left: chessboardRef.current.offsetLeft + x.indexOf(p.position.charAt(0)) * 100 + 35 });
                        }
                    }
                });

                setActivePiece(element);
            }
        } else if (e.button === 2) {
            setRightClicked(x[Math.floor((e.clientX - chessboardRef.current.offsetLeft) / 100)] + y[Math.floor((e.clientY - chessboardRef.current.offsetTop) / 100)]);

        }

    }

    function movePiece(e) {
        const chessboard = chessboardRef.current;

        if (activePiece !== null && chessboard !== undefined) {
            const minX = chessboard.offsetLeft - 50;
            const minY = chessboard.offsetTop - 50;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 50;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 50;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";

            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPiece(e) {
        const chessboard = chessboardRef.current;

        let x;
        let y;
        if (color === "white") {
            x = xAxis;
            y = yAxis
        } else {
            x = ["h", "g", "f", "e", "d", "c", "b", "a"]
            y = ["1", "2", "3", "4", "5", "6", "7", "8"]
        }

        if (activePiece !== null) {
            let mousePosition = x[Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + y[Math.floor((e.clientY - chessboard.offsetTop) / 100)];
            console.log("tried to move")
            move(activePiece.id, mousePosition)
        }

        if (e.button === 2 && rightClicked !== null) {
            const toSquare = x[Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + y[Math.floor((e.clientY - chessboard.offsetTop) / 100)];

            addArrow(rightClicked, toSquare);

            const positionOfSquare = (x.indexOf(toSquare.charAt(0))) + (y.indexOf(toSquare.charAt(1))) * 8;
            if (rightClicked === toSquare) {

                if (positionL[positionOfSquare].marked) {
                    setPieces(items => [...items.slice(0, positionOfSquare), { ...items[positionOfSquare], marked: false }, ...items.slice(positionOfSquare + 1)]);
                } else {
                    setPieces(items => [...items.slice(0, positionOfSquare), { ...items[positionOfSquare], marked: true }, ...items.slice(positionOfSquare + 1)]);
                }
            }
        }
    }

    let board = [];
    let colors = ["black", "white"];

    let counter = 0;
    for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 8; i++) {
            let img = undefined;

            positionL.forEach(p => {
                if (color === "black") {
                    if (p.position === ["h", "g", "f", "e", "d", "c", "b", "a"][i] + ["1", "2", "3", "4", "5", "6", "7", "8"][j]) {
                        img = p.image;
                    }
                } else {
                    if (p.position === xAxis[i] + yAxis[j]) {
                        img = p.image;
                    }
                }

            })

            if (color === "black") {
                positionL[counter].position = ["h", "g", "f", "e", "d", "c", "b", "a"][i] + ["1", "2", "3", "4", "5", "6", "7", "8"][j]
            }

            board.push(
                <Tile key={`${positionL[counter].position}`} color={colors[(i + j) % 2]}
                    position={positionL[counter].position}
                    image={img}
                    moved={positionL[counter].justmoved}
                    check={positionL[counter].check}
                    marked={positionL[counter].marked}
                />
            )
            counter++;
        }
    }
    let keyCounter = 1337;

    arrows.forEach(h => {
        board.push(h);
    })

    hints.forEach(h => {
        board.push(<MoveHint capture={false} key={"hint" + " " + keyCounter} position={h.position} left={h.left} top={h.top}></MoveHint>)
        keyCounter++;
    })
    captures.forEach(h => {
        board.push(<MoveHint capture={true} key={"capture " + " " + keyCounter} position={h.position} left={h.left} top={h.top}></MoveHint>)
        keyCounter++;
    })



    return (
        <div
            onMouseUp={(e) => dropPiece(e)}
            onMouseMove={(e) => movePiece(e)}
            onMouseDown={(e) => grabPiece(e)}
            onContextMenu={(e) => e.preventDefault()}
            id="chessboard"
            ref={chessboardRef}
        >
            { }
            {(() => {
                backwardsGame = new Chess()
                let history = game.history();

                for (let index = 0; index < NumberOfMoveViewing; index++) {
                    backwardsGame.move(history[index])
                }
                loadFen(game.fen())
            })()}
            {board}

        </div>
    );
}


export default Chessboard
