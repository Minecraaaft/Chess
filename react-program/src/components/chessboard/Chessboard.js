import React from 'react'
import Tile from './Tile'
import { useState, useRef } from 'react';
import Chess from 'chess.js'
import MoveHint from './MoveHint';

var game = new Chess();
var backwardsGame = new Chess();

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
let xAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
let yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

let tilesJustMoved = [];

const Chessboard = ({ updateMoveList, NumberOfMoveViewing, increaseMoveNumber, setChessStatusFen }) => {
    // const [game, setGame] = useState(new Chess());
    // const [backwardsGame, setBackwardsGame] = useState(new Chess())
    const chessboardRef = useRef(null);
    //const [moveback, setMoveBack] = useState({ moveBack })

    const [positionL, setPieces] = useState(startPosition);
    const [hints, setHints] = useState([]);
    const [captures, setCaptures] = useState([]);
    const [activePiece, setActivePiece] = useState(null);
    const [lastClicked, setLastClicked] = useState();
    const [arrows, setArrows] = useState([]);
    const [rightClicked, setRightClicked] = useState(null);
    const [markedTiles, setMarkerTiles] = useState([]);



    function loadFen(fen) {

        let counter = 0;

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
            tilesJustMoved[0]= backwardsGame.history({ verbose: true })[historyLength - 1].from;
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
            loadFen(game.fen());
            updateMoveList(game.history());
            setChessStatusFen(game.fen())
            let newNumberOfMoves = NumberOfMoveViewing === undefined ? 1 : NumberOfMoveViewing + 1;
            increaseMoveNumber(newNumberOfMoves);
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
        if (e.button < 2) {
            setArrows([]);
            removeMarkedTiles();
            const element = e.target;
            const pieceClicked = positionL.find(p => p.position === element.id);

            console.log(activePiece)
            console.log(lastClicked)
            if (lastClicked !== undefined) { // need id only 
                const chessboard = chessboardRef.current;
                let tileClicked = xAxis[Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + yAxis[Math.floor((e.clientY - chessboard.offsetTop) / 100)];

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
                        setCaptures(c => [...c, { position: p.position, top: chessboardRef.current.offsetTop + yAxis.indexOf(p.position.charAt(1)) * 100, left: chessboardRef.current.offsetLeft + xAxis.indexOf(p.position.charAt(0)) * 100 }]);

                    }
                    if (notation.includes(p.position)) {
                        setHints(h => [...h, { position: p.position, top: chessboardRef.current.offsetTop + yAxis.indexOf(p.position.charAt(1)) * 100 + 35, left: chessboardRef.current.offsetLeft + xAxis.indexOf(p.position.charAt(0)) * 100 + 35 }]);
                    }

                    // if castling extra hint circle is given
                    if (possibleMoves.includes("O-O")) {
                        if ((currentTurn === "w" && p.position === "g1") || (currentTurn === "b" && p.position === "g8")) {
                            hints.push({ position: p.position, top: chessboardRef.current.offsetTop + yAxis.indexOf(p.position.charAt(1)) * 100 + 35, left: chessboardRef.current.offsetLeft + xAxis.indexOf(p.position.charAt(0)) * 100 + 35 });
                        }
                    }
                    if (possibleMoves.includes("O-O-O")) {
                        if ((currentTurn === "w" && p.position === "c1") || (currentTurn === "b" && p.position === "c8")) {
                            hints.push({ position: p.position, top: chessboardRef.current.offsetTop + yAxis.indexOf(p.position.charAt(1)) * 100 + 35, left: chessboardRef.current.offsetLeft + xAxis.indexOf(p.position.charAt(0)) * 100 + 35 });
                        }
                    }
                });

                setActivePiece(element);
            }
        } else if (e.button === 2) {
            setRightClicked(xAxis[Math.floor((e.clientX - chessboardRef.current.offsetLeft) / 100)] + yAxis[Math.floor((e.clientY - chessboardRef.current.offsetTop) / 100)]);

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

        if (activePiece !== null) {
            let mousePosition = xAxis[Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + yAxis[Math.floor((e.clientY - chessboard.offsetTop) / 100)];

            move(activePiece.id, mousePosition)
        }

        if (e.button === 2 && rightClicked !== null) {
            const toSquare = xAxis[Math.floor((e.clientX - chessboard.offsetLeft) / 100)] + yAxis[Math.floor((e.clientY - chessboard.offsetTop) / 100)];

            addArrow(rightClicked, toSquare);

            const positionOfSquare = (xAxis.indexOf(toSquare.charAt(0))) + (yAxis.indexOf(toSquare.charAt(1))) * 8;
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
    for (let j = 7; j >= 0; j--) {
        for (let i = 0; i < 8; i++) {
            let img = undefined;

            positionL.forEach(p => {
                if (p.position === xAxis[i] + verticalAxis[j]) {
                    img = p.image;
                }
            })

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
            {}
            {(() => {
                backwardsGame = new Chess()
                let history = game.history();

                for (let index = 0; index < NumberOfMoveViewing; index++) {
                    backwardsGame.move(history[index])
                }
                loadFen(backwardsGame.fen())
            })()}
            {board}

        </div>
    );
}

let startPosition = [
    { piece: "rook", position: "a8", color: "black", image: "./assets/black_rook.svg", justmoved: false, check: false, marked: false },
    { piece: "knight", position: "b8", color: "black", image: "./assets/black_knight.svg", justmoved: false, check: false, marked: false },
    { piece: "bishop", position: "c8", color: "black", image: "./assets/black_bishop.svg", justmoved: false, check: false, marked: false },
    { piece: "queen", position: "d8", color: "black", image: "./assets/black_queen.svg", justmoved: false, check: false, marked: false },
    { piece: "king", position: "e8", color: "black", image: "./assets/black_king.svg", justmoved: false, check: false, marked: false },
    { piece: "bishop", position: "f8", color: "black", image: "./assets/black_bishop.svg", justmoved: false, check: false, marked: false },
    { piece: "knight", position: "g8", color: "black", image: "./assets/black_knight.svg", justmoved: false, check: false, marked: false },
    { piece: "rook", position: "h8", color: "black", image: "./assets/black_rook.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "a7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "b7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "c7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "d7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "e7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "f7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "g7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "h7", color: "black", image: "./assets/black_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: undefined, position: "a6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "b6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "c6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "d6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "e6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "f6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "g6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "h6", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

    { piece: undefined, position: "a5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "b5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "c5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "d5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "e5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "f5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "g5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "h5", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

    { piece: undefined, position: "a4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "b4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "c4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "d4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "e4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "f4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "g4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "h4", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

    { piece: undefined, position: "a3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "b3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "c3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "d3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "e3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "f3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "g3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },
    { piece: undefined, position: "h3", color: undefined, image: undefined, justmoved: false, check: false, marked: false },

    { piece: "pawn", position: "a2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false },
    { piece: "pawn", position: "b2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "c2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "d2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "e2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "f2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "g2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "pawn", position: "h2", color: "white", image: "./assets/white_pawn.svg", justmoved: false, check: false, marked: false },
    { piece: "rook", position: "a1", color: "white", image: "./assets/white_rook.svg", justmoved: false, check: false, marked: false },
    { piece: "knight", position: "b1", color: "white", image: "./assets/white_knight.svg", justmoved: false, check: false, marked: false },
    { piece: "bishop", position: "c1", color: "white", image: "./assets/white_bishop.svg", justmoved: false, check: false, marked: false },
    { piece: "queen", position: "d1", color: "white", image: "./assets/white_queen.svg", justmoved: false, check: false, marked: false },
    { piece: "king", position: "e1", color: "white", image: "./assets/white_king.svg", justmoved: false, check: false, marked: false },
    { piece: "bishop", position: "f1", color: "white", image: "./assets/white_bishop.svg", justmoved: false, check: false, marked: false },
    { piece: "knight", position: "g1", color: "white", image: "./assets/white_knight.svg", justmoved: false, check: false, marked: false },
    { piece: "rook", position: "h1", color: "white", image: "./assets/white_rook.svg", justmoved: false, check: false, marked: false },
]

export default Chessboard
