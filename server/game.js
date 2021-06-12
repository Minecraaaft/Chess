module.exports = class Game {
    constructor(chessGame, whiteName, blackName, roomName, whitePlayerNumber, blackPlayerNumber) {
        this.chessGame = chessGame;
        this.whiteName = whiteName;
        this.blackName = blackName;
        this.roomName = roomName;
        this.whitePlayerNumber = whitePlayerNumber;
        this.blackPlayerNumber = blackPlayerNumber;
    }

    makeMove(source, target) {

        // see if the move is legal
        var move = this.chessGame.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        })
    
        if (move === null) return null
        return this.chessGame.fen();
    }

    containsPlayerNumber(playerNumber) {
        return (this.whitePlayerNumber == playerNumber || this.blackPlayerNumber == playerNumber)
    }
}