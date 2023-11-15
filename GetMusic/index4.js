var express = require('express');
var bodyParser = require('body-parser');
var routes = require("./routes");
let path = require("path");


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(routes);


let http = require('http');
let server = http.createServer(app);
let io = require('socket.io').listen(server);


let userInfo = [];
let nextId = 1;
io.on('connection', function(socket) {
    socket.on('addUser', function(data){
        for(let i of userInfo){
            if(i != null){
                if(i[0][0] == data.username){
                    console.log(data.username + "already exists")
                    return;
                }
            }
        }
        console.log(data.username + "was added")
        let info = [data.username,0,"#808080","#f2f2f2"]
        userInfo[nextId++] = [info]
    })

    socket.on('style', function (data) {
        let id = getId(data.username);
        userInfo[id][0][2] = data.color1;
        userInfo[id][0][3] = data.color2;
        io.emit('setStyle', {username: data.username, color1: userInfo[id][0][2], color2: userInfo[id][0][3]})
    });

    socket.on('reqStyle', function(data){
        let id = getId(data.username);
        io.emit('setStyle', {username: data.username, color1: userInfo[id][0][2], color2: userInfo[id][0][3]})
    })

    socket.on('message', function (data) {
        let id = getId(data.username);
        var retString = "<span>" + data.username + "</span>: " + data.text
        userInfo[id][0][1] += 25;
        io.emit('update', {username:data.username,points:userInfo[id][0][1],val:retString});
    });

    socket.on('polling', function (data){
        let id = getId(data.username);
        if(userInfo[id]!=null)
            userInfo[id][0][1] += 5;
        io.emit('polled', {username:data.username,points:userInfo[id][0][1]});
    })


    socket.on('points',function (data){
        let id = getId(data.username);
        if(data.func == 1)
            userInfo[id][0][1] -= 200;
        io.emit('pointsReturn',{username:data.username,points:userInfo[id][0][1]})
    })

    socket.on('buy', function (data){
        let id = getId(data.username);
        if(userInfo[id][data.index] != null){
            socket.emit('owned',{username:data.username,val:"You already own this song!"})
            return;
        }
        userInfo[id][data.index] = data;
        console.log(userInfo[id][data.index])
        socket.emit('bought',{username:data.username,val:"Success!"})
    })

    socket.on('songs',function (data){
        let id = getId(data.username);
        let retArray = []
        for(let i=1;i<userInfo[id].length;i++){
            if(userInfo[id][i] != null){
                retArray.push(userInfo[id][i])
            }
        }
        io.emit('songsReturn',{username:data.username,array:retArray})
    })


    function getId(username){
        for(let i=0;i<userInfo.length;i++){
            if(userInfo[i]!= null){
                if(userInfo[i][0][0] == username)
                    return i;
            }
        }
    }
});

app.get("/",function(req,res) {
    res.sendFile(path.resolve(__dirname + "/public/views/index4.html"));
});

app.get("/chat",function(req,res) {
    res.sendFile(path.resolve(__dirname + "/public/views/chat.html"));
});

app.get("/store",function(req,res) {
    res.sendFile(path.resolve(__dirname + "/public/views/store.html"));
});

app.get("/library",function(req,res) {
    res.sendFile(path.resolve(__dirname + "/public/views/library.html"));
});

var port = process.env.PORT || 3004;
server.listen(port);


