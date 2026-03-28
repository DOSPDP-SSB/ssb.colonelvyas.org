var elem = document.getElementById("fullscreen");

function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
          }
        }
        function closeFullscreen() {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
              document.msExitFullscreen();
            }
          }
          function SHOWVIDEO() {
          document.getElementById("video").style.display = "block";
          }
        
          function SHOWBTN() {
            document.getElementById("mybutton").style.display = "block";
          }
        
          function HIDEBTN() {
            document.getElementById("mybutton").style.display = "none";
          }
        
          function HIDEVIDEO() {
            document.getElementById("video").style.display = "none";
            }
          var myVideo = document.getElementById("video");
        
        function playPause() { 
            if (myVideo.paused) 
              myVideo.play(); 
            else 
              myVideo.pause(); 
          } 
        
         video = document.getElementById('video');
        video.addEventListener('ended',function() {alert('video is ended');       
        window.location.href = '/';})        
        
