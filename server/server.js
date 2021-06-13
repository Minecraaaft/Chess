const io = require('socket.io')(3001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

const Game = require('./game');

const { Chess } = require('chess.js');
var newGame = new Game(new Chess, null, null);
var users = [];
var roomCounter = 0;
var games = []
var playerEntered = 0;
const playerColor = ['white', 'black'];

// Run when client connects
io.on('connection', (socket) => {
    console.log("connected")
    
    socket.on("join server", (username) => {
        
        const user = {
            username,
            id: socket.id
        };
        users.push(user);

    });

    socket.on("join room", (roomName, cb) => {
        socket.join(roomName);
    });

    socket.on("find room", username => {
        console.log("tried to find room")
        playerEntered++;

        var playerColor;
        
        if (newGame.whitePlayerNumber == null) {
            newGame.whitePlayerNumber = playerEntered;
            newGame.whiteName = username;
            playerColor = "white";

            newGame.roomName = 'game' + roomCounter;
            socket.emit('setPlayerNumber', playerEntered);
            socket.emit('chooseColor', playerColor);
            
            socket.join(newGame.roomName);
            console.log("white entered")
        } else if (newGame.blackNumber == null) {
            console.log("black entered")
            newGame.blackPlayerNumber = playerEntered;
            newGame.blackName = username;
            playerColor = "black";
            socket.emit('setPlayerNumber', playerEntered);
            socket.emit('chooseColor', playerColor);

            socket.join(newGame.roomName);

            var startInfo = {
                whiteUsername: newGame.whiteName,
                blackUsername: newGame.blackName
            }

            io.to(newGame.roomName).emit('initialize', startInfo)
            

            games.push(newGame);
            roomCounter++;
            newGame = new Game(new Chess, null, null, null);
            
        }
        
        
    })


    socket.on('clientMove', (moveMessage) => {
        console.log(moveMessage.playerNumber)
        games.forEach(game => {
            
            if (game.containsPlayerNumber(moveMessage.playerNumber)) {
                console.log("move controlled")
                if (game.makeMove(moveMessage.from, moveMessage.to) != null) {
                    console.log("move accepted")
                    socket.broadcast.to(game.roomName).emit('serverMove', moveMessage);
                }
            }
        })

    })

})