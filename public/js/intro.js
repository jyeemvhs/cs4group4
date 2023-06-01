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

    function logoutClicked(){
    console.log("session logoutClicked")
      $.get("/logout",function(data){
    console.log("session logout function callback");    
        window.location = data.redirect;
      });
      return false;            
    }

    $('#box').on('click',function() {
      document.getElementById("container").removeAttribute("hidden");
    });

    $('#close').on('click',function() {
      document.getElementById("container").setAttribute("hidden", "hidden");
    });

    $('#profile').on('click',function() {
      document.getElementById("messages").removeAttribute("hidden");
    });

    $('#return').on('click',function() {
      document.getElementById("messages").setAttribute("hidden", "hidden");
    });

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
   
    console.log("session doc ready")
      $.get("/userInfo",function(data){
    console.log("session get userInfo function callback");    

    if (data.username)
      $("#session").html("Session " + data.username);
    });
      $("#logout").click(logoutClicked);

      $('#type').on('click',function() {
        $('#type').val("");
      });

      $("#type").keydown( function( event ){
        if(document.getElementById("text").childElementCount >= 7){
          return
        }
        else if(document.getElementById("text").childElementCount < 7)
        if ( event.which === 13 ) {
          if ($("#type").val() == "") {
            $("#text").append("<li class = you>" + "." + "</li>");
            $("#other").clone(true).appendTo($("#text"));
          }
          else{
            $("#text").append("<li class = you>" + $("#type").val() + "</li>");
            $("#other").clone(true).appendTo($("#text"));
          }
          console.log(document.getElementById("text").childElementCount);
        }
      });
  });
 