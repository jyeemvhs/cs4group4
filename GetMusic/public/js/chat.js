let socket = io();
let username = "";

$(document).ready(function(){
    $("#chatText").keydown( function( event ) {
      if ( event.which === 13 ) {
        if($("#chatText").val().trim() == ""){
            return false;
        }
        socket.emit('message', {username:username,text:$("#chatText").val()});
        $("#chatText").val("")

        event.preventDefault();
        return false;
      }
    });

  socket.on('pointsReturn',function(data){
    if(data.username == username)
      $("#points").text("Points: " + data.points)
  })

    socket.on('update', function(data) {
      $("#list").children(':first').prepend("<li>" + data.val + "</li>");
      if(username == data.username){
          $("#points").text("Points: " + data.points)
      }
    });

    socket.on('polled', function(data) {
      if(username == data.username){
          $("#points").text("Points: " + data.points)
      }
  });

    socket.on('setStyle',function(data){
      if(data.username == username){
        $("#body").css('background-color',data.color1);
        $("#body").css('color',data.color2);
        $(".a").css('color',data.color2);
      }
  });

  let numMilliSeconds = 10000;   // 10 seconds
  setTimeout(polling, numMilliSeconds);
});

function polling() {
  socket.emit('polling', {username:username});

  let numMilliSeconds = 10000;   // 10 seconds
  setTimeout(polling, numMilliSeconds);
};

//////////////////////////////////////////////////////////////

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    username = user;
    socket.emit('reqStyle', {username:username})
    socket.emit('points', {username:username})
  } 
  else {
    //SEND BACK TO INDEX4.HTML
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

