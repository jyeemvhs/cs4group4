let socket = io();
let username = "";
let buyingPower = false;

function trialStop(event) {
  if (event.currentTime > 10) {
    event.pause;
    event.currentTime = 0
  }
}

$(document).ready(function(){
  socket.on('pointsReturn',function(data){
    if(data.username == username){
      $("#points").text("Points: " + data.points)
      if(data.points < 200)
        buyingPower = false;
      else 
        buyingPower = true;
    }
  })

  $("#buyButton").click(function(){
    socket.emit('points',{username:username,func:0})
    if(buyingPower == false){
      alert("You don't have enough money! Get busy chatting failiure!")
      return false;
    }

    let index = 0;
    console.log("Index: " + ($("#index").val()))
    $("#table tr").each(function() {
      if (index == $("#index").val()) 
      {
        socket.emit('buy',{username:username,
                           index:$(this).find("td:eq(0)").text(),
                           title:$(this).find("td:eq(1)").text(),
                           artist:$(this).find("td:eq(2)").text(),
                           genre:$(this).find("td:eq(3)").text(), 
                           year:$(this).find("td:eq(4)").text(),                                  
                           audio: $(this).find("td:eq(5)").find("audio").attr("src")
        });
      }
      index++;
    });
  });

  socket.on('bought',function (data){
    if(data.username == username){
      socket.emit('points',{username:username,func:1})
      alert(data.val)
    }
  })

  socket.on('owned',function (data){
    if(data.username == username){
      alert(data.val)
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

