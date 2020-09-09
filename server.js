const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;
var original = "white";

io.on('connection', function (socket) { //This triggers our server's connection listener to run, and this occurs for  every new socket connection. 

    socket.emit("color", {color: original});
    
    socket.on("update", function(data){
        io.emit("color", {color: data.color
        });
    });
});

app.get('/', (req, res) => {
    res.render('index');
});