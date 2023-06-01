let milliseconds = 0;
let winClicked = false;

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
    $('#box').on('click',function() {
      $(this).box;
      $(this).remove();
    });

    $('#ad').on('click',function() {
          window.location.href = "http://localhost:3004/gameOver";
    });
    $('#box2').on('click',function() {
      $(this).box;
      $(this).remove();
    });

    $('#ad2').on('click',function() {
          window.location.href = "http://localhost:3004/gameOver";
    });
    $('#box3').on('click',function() {
      $(this).box;
      $(this).remove();
    });

    $('#ad3').on('click',function() {
          window.location.href = "http://localhost:3004/gameOver";
    });
    $('#box4').on('click',function() {
      $(this).box;
      $(this).remove();
    });

    $('#ad4').on('click',function() {
          window.location.href = "http://localhost:3004/gameOver";
    });
    $('#hover').on('click',function() {
      winClicked = true;
          $.ajax({
            url: "/update",
            type: "PUT",
            data: {
            time:milliseconds
            },
            success: function(data){
                if (data.error)
                  alert("bad");
                else{
                  alert("good");
                  window.location.href = "http://localhost:3004/leaderBoard";
                }

              } ,     
            dataType: "json"
          });   
          return false;
        //window.location.href = "http://localhost:3004/leaderBoard";
    });

    function logoutClicked(){
    console.log("session logoutClicked")
      $.get("/logout",function(data){
    console.log("session logout function callback");    
        window.location = data.redirect;
      });
      return false;            
    }
let maxAdsreached = false;
  $(document).ready(function(){
    console.log(document.getElementById("container").childElementCount);
    $("#hover").css('position','absolute').css('top', document.getElementById("Goal").style.top).css('left', document.getElementById("Goal").style.left);
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
    Multiply();
    function Multiply() {
      if(maxAdsreached == true){
        return;
      }
      //Make sure to make limit 1 more than the actual number
      else if (document.getElementById("container").childElementCount <= 101){
       
        $("#box").clone(true).appendTo($("#container"));
        $("#box").css('position','absolute').css('top', Math.random()* 700 + 'px').css('left', Math.random()* 1400 + 'px');

        $("#box2").clone(true).appendTo($("#container"));
        $("#box2").css('position','absolute').css('top', Math.random()* 700 + 'px').css('left', Math.random()* 1400 + 'px');

        $("#box3").clone(true).appendTo($("#container"));
        $("#box3").css('position','absolute').css('top', Math.random()* 700 + 'px').css('left', Math.random()* 1400 + 'px');

        $("#box4").clone(true).appendTo($("#container"));
        $("#box4").css('position','absolute').css('top', Math.random()* 700 + 'px').css('left', Math.random()* 1400 + 'px');
      }
      else if(document.getElementById("container").childElementCount > 101)
        maxAdsreached = true;
      let numMilliSeconds = 30;
      setTimeout(Multiply, numMilliSeconds);
    }
    Timer();
    function Timer() {
      if(winClicked == false){
      milliseconds++;
      }
      $("#time").html("Time: " + milliseconds);
      let numMilliSeconds = 30;
      setTimeout(Timer, numMilliSeconds);
    }
    console.log("session doc ready")
      $.get("/userInfo",function(data){
    console.log("session get userInfo function callback");    

    });
      $("#logout").click(logoutClicked);
  });
 