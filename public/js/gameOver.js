function handleButtonClick(){
  let myAudio = document.querySelector('#audio');
  //console.log($("#musicButton").text());
  if($("#musicButton").text()=="Play"){
    $("#musicButton").text("Pause");
    $("#musicButton").attr('value','Pause Music');
    myAudio.play();
  }
  else{
    $("#musicButton").text("Play");
    $("#musicButton").attr('value','Play Music');
    myAudio.pause();
  }
}
function logoutClicked(){
  console.log("session logoutClicked")
  $.get("/logout",function(data){
    console.log("session logout function callback");    
    window.location = data.redirect;
  });
  return false;            
}
$(document).ready(function(){
  let myAudio = document.querySelector('#audio');
  if(!myAudio.paused){
    myAudio.play();
    $("#musicButton").attr('value','Pause Music');
    $("#musicButton").text("Pause");
  }
  else{
    myAudio.pause();
    $("#musicButton").attr('value','Play Music');
    $("#musicButton").text("Play");
  }
    $("#logout").click(logoutClicked);
});