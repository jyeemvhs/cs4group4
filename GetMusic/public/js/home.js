let socket = io();
let username = "";

$(document).ready(function(){
  
  $("#color1").on('input', function(){socket.emit('style', {username:username,color1:$("#color1").val(),color2:$("#color2").val()})})
  $("#color2").on('input', function(){socket.emit('style', {username:username,color1:$("#color1").val(),color2:$("#color2").val()})})

  socket.on('setStyle',function(data){
    if(data.username == username){
      $("#body").css('background-color',data.color1);
      $("#body").css('color',data.color2);
      $(".a").css('color',data.color2);
    }
  });
});
  
//////////////////////////////////////////////////////////////

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
    username = user;
    socket.emit("addUser", {username:username})
    socket.emit('reqStyle', {username:username})
  } 
  else {
     user = prompt("Please enter a username:","");
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  username = cvalue;
  socket.emit("addUser", {username:cvalue})
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

