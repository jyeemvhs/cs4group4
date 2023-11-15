
let socket = io();
let username = "";

$(document).ready(function(){
  socket.on('songsReturn',function(data){
    if(username == data.username){
      for(let j of data.array){
        $("#table").append("<tr><td>" + 
                            j.index + "</td><td>" + 
                            j.title + "</td><td>" + 
                            j.artist + "</td><td>" + 
                            j.genre + "</td><td>" + 
                            j.year + "</td><td>" +                                 
                            "<audio src=" + j.audio + " controls></audio>" + "</td><tr>")
      }
    }
  })

  socket.on('setStyle',function(data){
    if(data.username == username){
      $("#body").css('background-color',data.color1);
      $("#body").css('color',data.color2);
      $(".a").css('color',data.color2);
    }
  });

});

///////////////////////////////////////////////////

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    username = user;
    socket.emit('reqStyle', {username:username})
    socket.emit('points', {username:username,func:0})
    socket.emit('songs',{username:username})
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

