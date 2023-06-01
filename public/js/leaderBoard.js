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

  function readClicked(username){
          $.ajax({
            url: "/read",
            type: "GET",
            data: {},
            success: function(data){
                if (data.error)
                  alert("bad");
                else {
                  $('#board').append('<tr><td>' + data.time + '</td></tr>');
                }
              } ,     
            dataType: "json"
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
    
    


    console.log("session doc ready")
      $.get("/userInfo",function(data){

        readClicked(data.username);
        
    console.log("session get userInfo function callback");    
    });


    $("#logout").click(logoutClicked);


  });