function handleButtonClick()
      {
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


 
  function userClicked(){
console.log("login userClicked")
          $.post("/login",{username:$("#username").val(), password:$("#psw").val()},function(data)
{
  console.log("login callback function")
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
        $("#username").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });
       
        $("#psw").keydown( function( event ) {
            if ( event.which === 13 ) {
              userClicked();
              event.preventDefault();
              return false;
            }
        });


  });  
   


